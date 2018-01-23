import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'
import { normalize, schema } from 'normalizr'
import api from 'api'

const commentSchema = new schema.Entity('comments', {}, { idAttribute: '_id' })
const commentListSchema = [commentSchema]
const replySchema = new schema.Entity('replies', {}, { idAttribute: '_id' })
const replyListSchema = [replySchema]

const initialState = fromJS({
  articleId: 0,
  entities: {
    comments: {},
    replies: {},
  },
})

export const actions = {
  loadReplies: commentId => async (dispatch) => {
    dispatch({ type: types.reply.REQUEST })

    try {
      const { data: { replies } } = await api.get(`/comments/${commentId}/replies`)

      if (replies.length) {
        dispatch({
          type: types.reply.SUCCESS,
          payload: normalize(replies, replyListSchema),
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: types.reply.ERROR, payload: error })
    }
  },
}

export const selectors = {
  getRepliesOfComment: ({ comment }, commentId) =>
    (comment.getIn(['entities', 'replies']) || Map())
      .filter(reply => reply.get('parent') === commentId)
      .toJS(),
  getComments: ({ comment }) =>
    (comment.getIn(['entities', 'comments']) || Map()).toJS(),
}

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload: { entities, result } }) => {
      if (result.length === 1) {
        const { comments } = entities.articles[result[0]]

        return state
          .set('articleId', result[0])
          .merge(normalize(comments, commentListSchema))
      }
      return state
    },
    [types.reply.SUCCESS]: (state, { payload }) => state.mergeDeep(payload),
  },
  initialState,
)

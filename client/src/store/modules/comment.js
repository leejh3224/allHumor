import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'
import { normalize, schema } from 'normalizr'
import { createSelector } from 'reselect'
import api from 'api'
import orderBy from 'lodash/orderBy'

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

const getArticleId = ({ comment }) => comment.get('articleId')

export const addComment = content => async (dispatch, getState) => {
  const state = getState()
  const articleId = getArticleId(state)
  const userId = state.user.get('userId')
  const avatar = state.user.get('avatar')
  const author = state.user.get('displayName')

  dispatch({ type: types.comment.ADD_REQUEST })

  try {
    const { data: { comments } } = await api.post('/comments', {
      articleId,
      userId,
      avatar,
      author,
      content,
    })

    if (comments) {
      dispatch({
        type: types.comment.ADD_SUCCESS,
        payload: normalize(comments, commentListSchema),
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.comment.ADD_ERROR, payload: error })
  }
}

export const addReply = (content, parentId) => async (dispatch, getState) => {
  const state = getState()
  const userId = state.user.get('userId')
  const avatar = state.user.get('avatar')
  const author = state.user.get('displayName')

  dispatch({ type: types.reply.ADD_REQUEST })

  try {
    const { data: { replies } } = await api.post(
      `/comments/${parentId}/replies`,
      {
        userId,
        avatar,
        author,
        content,
      },
    )

    if (replies) {
      dispatch({
        type: types.reply.ADD_SUCCESS,
        payload: normalize(replies, replyListSchema),
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.reply.ADD_ERROR })
  }
}

export const loadReplies = commentId => async (dispatch) => {
  dispatch({ type: types.reply.REQUEST, payload: commentId })

  try {
    const { data: { replies } } = await api.get(`/comments/${commentId}/replies`)

    if (replies.length) {
      dispatch({
        type: types.reply.SUCCESS,
        payload: {
          id: commentId,
          data: normalize(replies, replyListSchema),
        },
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.reply.ERROR, payload: { id: commentId, error } })
  }
}

export const getRepliesOfComment = ({ comment, ui }, commentId) =>
  comment
    .getIn(['entities', 'replies'])
    .filter(reply => reply.get('parent') === commentId)
    .map(reply => reply.merge(ui.getIn(['replies', reply.get('_id')])))
    .toJS()

export const getOrderedReplies = createSelector(getRepliesOfComment, replies =>
  orderBy(Object.values(replies), ['createdAt'], ['desc']))

export const getComments = ({ comment, ui }) =>
  comment
    .getIn(['entities', 'comments'])
    .map(c => c.merge(ui.getIn(['comments', c.get('_id')])))
    .toJS()

export const getOrderedComments = createSelector(getComments, comments =>
  orderBy(Object.values(comments), ['createdAt'], ['desc']))

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload: { entities, result } }) => {
      if (result.length === 1) {
        const articleId = result[0]
        const { comments } = entities.articles[articleId]
        const normalized = normalize(comments, commentListSchema)

        return state
          .set('articleId', articleId)
          .setIn(
            ['entities', 'comments'],
            fromJS(normalized.entities.comments) || Map(),
          )
      }
      return state
    },
    [types.comment.ADD_SUCCESS]: (state, { payload }) =>
      state.mergeDeepWith((prev, next, key) => {
        if (key === 'replies') {
          return prev
        }
        return next
      }, fromJS(payload)),
    [types.reply.SUCCESS]: (state, { payload }) =>
      state.mergeDeep(payload.data),
  },
  initialState,
)

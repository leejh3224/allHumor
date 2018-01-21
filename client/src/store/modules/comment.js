import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'
import { normalize, schema } from 'normalizr'

const commentSchema = new schema.Entity('comments', {}, { idAttribute: '_id' })
const commentListSchema = [commentSchema]

const initialState = fromJS({
  articleId: 0,
  entities: {
    comments: {},
  },
})

export const selectors = {
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
  },
  initialState,
)

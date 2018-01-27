import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'

const initialState = fromJS({
  article: false,
  add: {
    comment: false,
  },
})

export const getFetchingArticle = ({ fetching }) => fetching.get('article')
export const getFetchingAddComment = ({ fetching }) =>
  fetching.getIn(['add', 'comment'])

export default handleActions(
  {
    [types.article.REQUEST]: state => state.setIn(['article'], true),
    [types.article.SUCCESS]: state => state.setIn(['article'], false),
    [types.article.ERROR]: state => state.setIn(['article'], false),
    [types.comment.ADD_REQUEST]: state => state.setIn(['add', 'comment'], true),
    [types.comment.ADD_SUCCESS]: state =>
      state.setIn(['add', 'comment'], false),
    [types.comment.ADD_ERROR]: state => state.setIn(['add', 'comment'], false),
  },
  initialState,
)

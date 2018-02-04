import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'

const initialState = fromJS({
  article: false,
  comment: false,
  search: false,
  add: {
    comment: false,
  },
})

export const getFetchingArticle = ({ fetching }) => fetching.get('article')
export const getFetchingAddComment = ({ fetching }) => fetching.getIn(['add', 'comment'])
export const getFetchingComment = ({ fetching }) => fetching.get('comment')
export const getFetchingSearchResult = ({ fetching }) => fetching.get('search')

export default handleActions(
  {
    [types.article.REQUEST]: state => state.setIn(['article'], true),
    [types.article.SUCCESS]: state => state.setIn(['article'], false),
    [types.article.ERROR]: state => state.setIn(['article'], false),
    [types.comment.ADD_REQUEST]: state => state.setIn(['add', 'comment'], true),
    [types.comment.ADD_SUCCESS]: state => state.setIn(['add', 'comment'], false),
    [types.comment.ADD_ERROR]: state => state.setIn(['add', 'comment'], false),
    [types.comment.REQUEST]: state => state.set('comment', true),
    [types.comment.SUCCESS]: state => state.set('comment', false),
    [types.comment.ERROR]: state => state.set('comment', false),
    [types.search.REQUEST]: state => state.set('search', true),
    [types.search.SUCCESS]: state => state.set('search', false),
    [types.search.ERROR]: state => state.set('search', false),
  },
  initialState,
)

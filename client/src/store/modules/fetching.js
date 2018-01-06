import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'

const initialState = fromJS({
  fetching: {
    article: false,
  },
})

// selectors
export const selectors = {
  getFetchingArticle: ({ fetching }) => fetching.getIn(['fetching', 'article']),
}

export default handleActions(
  {
    [types.article.REQUEST]: state => state.setIn(['fetching', 'article'], true),
    [types.article.SUCCESS]: state => state.setIn(['fetching', 'article'], false),
    [types.article.ERROR]: state => state.setIn(['fetching', 'article'], false),
  },
  initialState,
)

import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'

const initialState = fromJS({
  entities: {
    articles: {},
  },
})

// selectors
export const selectors = {
  getArticles: ({ entity }) => entity.getIn(['entities', 'articles']).toJS(),
}

// reducer
export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload }) => state.merge(payload),
  },
  initialState,
)

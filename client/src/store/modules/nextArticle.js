import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'

const initialState = fromJS({
  entities: {
    articles: {},
  },
})

export const getArticles = ({ nextArticle }) => nextArticle.getIn(['entities', 'articles']).toJS()

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload: { data } }) => {
      if (data.result.length === 1) {
        return state
      }
      return state.merge(data)
    },
  },
  initialState,
)

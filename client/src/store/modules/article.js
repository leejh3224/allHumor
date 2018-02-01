import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'
import api from 'api'
import types from 'store/actionTypes'
import { articleListSchema } from 'store/schema'
import { normalize } from 'normalizr'

const initialState = fromJS({
  entities: {
    articles: {},
  },
})

export const loadArticle = id => async dispatch => {
  dispatch({ type: types.article.REQUEST })

  try {
    const { data: { articles } } = await api.get(`/articles/${id}`)

    if (articles.length) {
      dispatch({
        type: types.article.SUCCESS,
        payload: {
          data: normalize(articles, articleListSchema),
        },
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.article.ERROR, payload: { error } })
  }
}

export const getArticles = ({ article }) =>
  (article.getIn(['entities', 'articles']) || Map()).toJS()

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload: { data } }) => state.merge(data),
  },
  initialState,
)

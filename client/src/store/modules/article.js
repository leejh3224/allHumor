import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'
import api from 'api'
import types from 'store/actionTypes'
import { articleListSchema } from 'store/schema'
import { normalize } from 'normalizr'
import values from 'lodash/values'

const initialState = fromJS({
  entities: {
    articles: {},
  },
})

export const loadArticle = id => async dispatch => {
  dispatch({ type: types.article.REQUEST })

  try {
    const { data: { articles } } = await api.get(`/articles/${id}`)

    if (articles) {
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
  values((article.getIn(['entities', 'articles']) || Map()).toJS())

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload: { data } }) => {
      if (data.result.length === 1) {
        const id = data.result[0]
        return state.setIn(['entities', 'articles', id], fromJS(data.entities.articles[id]))
      }
      return state.setIn(
        ['entities', 'articles'],
        fromJS(data.entities.articles).merge(state.getIn(['entities', 'articles'])),
      )
    },
  },
  initialState,
)

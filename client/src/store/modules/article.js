import { Map, fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
// import { normalize } from 'normalizr'
import values from 'lodash/values'

// import api from 'api'
import types from 'store/actionTypes'
// import { articleListSchema } from 'store/schema'

const initialState = Map({
  byId: Map(),
})

// export const loadArticle = id => async dispatch => {
//   dispatch({ type: types.article.REQUEST })

//   try {
//     const { data: { articles } } = await api.get(`/articles/${id}`)

//     if (articles.length) {
//       dispatch({
//         type: types.article.SUCCESS,
//         payload: {
//           data: normalize(articles, articleListSchema),
//         },
//       })
//     }
//   } catch (error) {
//     console.log(error)
//     dispatch({ type: types.article.ERROR, payload: { error } })
//   }
// }

export const getArticles = ({ article }) => values(article.get('byId').toJS())

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload: { data } }) => {
      if (data.result.length === 1) {
        const id = data.result[0]
        return state.setIn(['byId', id], fromJS(data.entities.articles[id]))
      }
      return state.set('byId', fromJS(data.entities.articles || {}).merge(state.get('byId')))
    },
  },
  initialState,
)

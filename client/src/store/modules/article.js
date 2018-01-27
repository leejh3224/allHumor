import { fromJS, Map } from 'immutable'
import { handleActions } from 'redux-actions'
import api from 'api'
import types from 'store/actionTypes'
import { normalize, schema } from 'normalizr'

// normalizr
const articleSchema = new schema.Entity('articles', {}, { idAttribute: '_id' })
const articleListSchema = [articleSchema]

const initialState = fromJS({
  entities: {
    articles: {},
  },
})

export const loadArticle = id => async (dispatch) => {
  dispatch({ type: types.article.REQUEST })

  try {
    const { data: { articles } } = await api.get(`/articles/${id}`)

    if (articles.length) {
      dispatch({
        type: types.article.SUCCESS,
        payload: normalize(articles, articleListSchema),
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.article.ERROR, payload: error })
  }
}

export const getArticles = ({ article }) =>
  (article.getIn(['entities', 'articles']) || Map()).toJS()

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { payload }) => state.merge(payload),
  },
  initialState,
)

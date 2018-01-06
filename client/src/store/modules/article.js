import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import api from 'api'
import { normalize, schema } from 'normalizr'

const initialState = fromJS({
  fetching: false,
  entities: {
    articles: {},
  },
  meta: { page: 1 },
  error: null,
})

// actionTypes
const types = {
  REQUEST: 'article/ARTICLE_REQUEST',
  SUCCESS: 'article/ARTICLE_SUCCESS',
  ERROR: 'article/ARTICLE_ERROR',
}

// thunks
export const actions = {
  loadArticles: () => async (dispatch, getState) => {
    const { article } = getState()
    const page = article.getIn(['meta', 'page'])

    dispatch({ type: types.REQUEST })
    try {
      /* eslint-disable */
      const { data: { articles } } = await api.get(`/articles/dogdrip/${page}`)
      const articleSchema = new schema.Entity('articles', {}, { idAttribute: '_id' })
      const articleListSchema = [articleSchema]

      if (articles) {
        dispatch({
          type: types.SUCCESS,
          payload: normalize(articles, articleListSchema),
          meta: { page },
        })
      }
    } catch (err) {
      console.log(err)
      dispatch({ type: types.ERROR, payload: err })
    }
  },
}

// selectors
export const selectors = {
  getArticles: ({ article }) => article.getIn(['entities', 'articles']).toJS(),
  getFetching: ({ article }) => article.get('fetching'),
}

// reducer
export default handleActions(
  {
    [types.REQUEST]: state => state.set('fetching', true),
    [types.SUCCESS]: (state, { payload, meta }) => {
      console.log(payload.articles)
      return state
        .set('fetching', false)
        .merge(payload)
        .setIn(['meta', 'page'], meta.page)
    },
    [types.ERROR]: state => state.set('fetching', false).set('error', payload.err),
  },
  initialState,
)

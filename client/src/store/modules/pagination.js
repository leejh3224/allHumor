import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import api from 'api'
import { normalize, schema } from 'normalizr'
import range from 'lodash/range'
import types from 'store/actionTypes'

// pagination settings
const perPage = 10
const lengthPageButton = 5

// normalizr
const articleSchema = new schema.Entity('articles', {}, { idAttribute: '_id' })
const articleListSchema = [articleSchema]

const initialState = fromJS({
  pages: {
    all: {
      current: 1,
      last: 1,
    },
    dogdrip: {
      current: 1,
      last: 1,
    },
  },
  category: 'all',
})

export const selectors = {
  getCurrentPage: ({ pagination }) => {
    const category = pagination.get('category')
    return pagination.getIn(['pages', category, 'current'])
  },
  /* eslint-disable no-mixed-operators, arrow-parens */
  getCurrentMinPage: ({ pagination }) => {
    const curruntPage = selectors.getCurrentPage({ pagination })
    return (
      Math.floor((curruntPage - 1) / lengthPageButton) * lengthPageButton + 1
    )
  },
  getCurrentMaxPage: state => {
    const minPage = selectors.getCurrentMinPage(state)
    const lastPage = selectors.getLastPage(state)

    if (minPage + lengthPageButton <= lastPage) {
      return minPage + (lengthPageButton - 1)
    }
    return lastPage
  },
  getLastPage: ({ pagination }) => {
    const category = pagination.get('category')
    return pagination.getIn(['pages', category, 'last'])
  },
  getRangeMinMax: state => {
    const minPage = selectors.getCurrentMinPage(state)
    const maxPage = selectors.getCurrentMaxPage(state)

    return range(minPage, maxPage + 1)
  },
  getCategory: ({ pagination }) => pagination.get('category'),
}

// thunks
export const actions = {
  loadArticle: id => async dispatch => {
    dispatch({ type: types.article.REQUEST })

    try {
      const { data: { articles } } = await api.get(`/articles/${id}`)

      if (articles) {
        dispatch({
          type: types.article.SUCCESS,
          payload: normalize(articles, articleListSchema),
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: types.article.ERROR, payload: error })
    }
  },
  loadArticles: (category, page) => async dispatch => {
    dispatch({ type: types.article.REQUEST })

    try {
      const { data: { articles, total } } = await api.get(`/articles/${category}/${page}`)

      if (articles) {
        dispatch({
          type: types.article.SUCCESS,
          payload: normalize(articles, articleListSchema),
          meta: { page, category },
        })
        dispatch({
          type: types.pagination.SET_LAST_PAGE,
          meta: { category, total },
        })
      }
    } catch (error) {
      console.log(error)
      dispatch({ type: types.article.ERROR, payload: error })
    }
  },
}

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { meta }) => {
      if (meta) {
        return state.setIn(['pages', meta.category, 'current'], meta.page)
      }
      return state
    },
    [types.pagination.SET_LAST_PAGE]: (state, { meta }) =>
      state.setIn(
        ['pages', meta.category, 'last'],
        Math.ceil(meta.total / perPage),
      ),
    '@@router/LOCATION_CHANGE': (state, { payload }) => {
      const routerMatch = payload.pathname.match(/\/(all|dogdrip)\/(\d{1,})/)
      const oldCategory = state.get('category')
      const oldPage = state.getIn(['pages', oldCategory, 'current'])

      if (routerMatch) {
        const [, newCategory = 'all', nextPage = '1'] = routerMatch
        const changingCategory = oldCategory !== newCategory
        const changingPage = !changingCategory && oldPage !== nextPage

        if (changingCategory || changingPage) {
          return state
            .set('category', newCategory)
            .setIn(['pages', newCategory, 'current'], parseInt(nextPage, 10))
        }
      }

      // go to home
      return state.set('category', 'all').setIn(['pages', 'all', 'current'], 1)
    },
  },
  initialState,
)

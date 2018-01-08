import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import api from 'api'
import { normalize, schema } from 'normalizr'
import range from 'lodash/range'
import types from 'store/actionTypes'

// pagination settings
const perPage = 10
const lengthPageButton = 5

const initialState = fromJS({
  pages: {
    all: {
      current: 1,
      last: 5,
    },
    dogdrip: {
      current: 1,
      last: 5,
    },
  },
  category: 'all',
})

/* eslint-disable */
export const selectors = {
  getCurrentPage: ({ pagination }) => {
    const category = pagination.get('category')
    return pagination.getIn(['pages', category, 'current'])
  },
  /* eslint-disable no-mixed-operators */
  getMinPage: ({ pagination }) => {
    const curruntPage = selectors.getCurrentPage({ pagination })
    return Math.floor((curruntPage - 1) / lengthPageButton) * lengthPageButton + 1
  },
  getMaxPage: state => {
    const minPage = selectors.getMinPage(state)
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
    const minPage = selectors.getMinPage(state)
    const maxPage = selectors.getMaxPage(state)

    return range(minPage, maxPage + 1)
  },
  getCategory: ({ pagination }) => pagination.get('category'),
}

// thunks
export const actions = {
  loadArticles: (category, page) => async dispatch => {
    dispatch({ type: types.article.REQUEST })

    try {
      /* eslint-disable */
      const { data: { articles, total } } = await api.get(`/articles/${category}/${page}`)
      const articleSchema = new schema.Entity('articles', {}, { idAttribute: '_id' })
      const articleListSchema = [articleSchema]

      if (articles) {
        dispatch({
          type: types.article.SUCCESS,
          payload: normalize(articles, articleListSchema),
          meta: { page, category },
        })

        dispatch({ type: types.pagination.SET_PAGE, meta: { page } })
        dispatch({ type: types.pagination.SET_LAST_PAGE, meta: { category, total } })
      }
    } catch (err) {
      console.log(err)
      dispatch({ type: types.article.ERROR, payload: err })
    }
  },
  loadPage: page => (dispatch, getState) => {
    const category = selectors.getCategory(getState())

    dispatch({ type: types.pagination.SET_PAGE, meta: { page } })
    actions.loadArticles(category, page)(dispatch, getState)
  },
  loadNextPage: () => (dispatch, getState) => {
    const maxPage = selectors.getMaxPage(getState())
    const lastPage = selectors.getLastPage(getState())
    const nextPage = maxPage + 1

    if (maxPage < lastPage) {
      actions.loadPage(nextPage)(dispatch, getState)
    }
  },
  loadPrevPage: () => (dispatch, getState) => {
    const minPage = selectors.getMinPage(getState())
    const currentPage = selectors.getCurrentPage(getState())

    if (minPage > 1) {
      actions.loadPage(minPage - 1)(dispatch, getState)
    }

    if (minPage === 1 && currentPage !== 1) {
      actions.loadPage(minPage)(dispatch, getState)
    }
  },
  setCategory: category => dispatch => {
    dispatch({ type: types.pagination.SET_CATEGORY, meta: { category } })

    // go to first page of category
    dispatch({ type: types.pagination.SET_PAGE, meta: { page: 1 } })
  },
}

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { meta }) => {
      return state.setIn(['pages', meta.category, 'current'], meta.page)
    },
    [types.pagination.SET_PAGE]: (state, { meta }) => {
      const category = state.get('category')
      return state.setIn(['pages', category, 'current'], meta.page)
    },
    [types.pagination.SET_LAST_PAGE]: (state, { meta }) =>
      state.setIn(['pages', meta.category, 'last'], Math.round(meta.total / perPage)),
    [types.pagination.SET_CATEGORY]: (state, { meta }) => state.set('category', meta.category),
  },
  initialState,
)

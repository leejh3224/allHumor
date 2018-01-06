import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import api from 'api'
import { normalize, schema } from 'normalizr'
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
  where: 'dogdrip',
})

export const selectors = {
  getCurrentPage: ({ pagination }) => {
    const where = pagination.get('where')
    return pagination.getIn(['pages', where, 'current'])
  },
  /* eslint-disable no-mixed-operators */
  getMinPage: ({ pagination }) => {
    const page = selectors.getCurrentPage({ pagination })
    return Math.floor((page - 1) / lengthPageButton) * lengthPageButton + 1
  },
  getMaxPage: ({ pagination }) => {
    const firstIndex = selectors.getMinPage({ pagination })
    return firstIndex + lengthPageButton
  },
  getLastPage: ({ pagination }) => {
    const where = pagination.get('where')
    return pagination.getIn(['pages', where, 'last'])
  },
}

// thunks
export const actions = {
  loadArticles: where => async (dispatch, getState) => {
    const { pagination } = getState()
    const page = pagination.getIn(['pages', where, 'current'])

    dispatch({ type: types.article.REQUEST })
    try {
      /* eslint-disable */
      const { data: { articles, total } } = await api.get(`/articles/${where}/${page}`)
      const articleSchema = new schema.Entity('articles', {}, { idAttribute: '_id' })
      const articleListSchema = [articleSchema]

      if (articles) {
        dispatch({
          type: types.article.SUCCESS,
          payload: normalize(articles, articleListSchema),
          meta: { page, where },
        })

        dispatch({ type: types.pagination.SET_LAST_PAGE, payload: { where, total } })
      }
    } catch (err) {
      console.log(err)
      dispatch({ type: types.article.ERROR, payload: err })
    }
  },
  loadPage: page => (dispatch, getState) => {
    const { pagination } = getState()
    const where = pagination.get('where')
    dispatch({ type: types.pagination.SET_PAGE, payload: { page } })
    actions.loadArticles(where)(dispatch, getState)
  },
  loadNextMinPage: () => (dispatch, getState) => {
    const { pagination } = getState()
    const minPage = selectors.getMinPage({ pagination })
    const maxPage = selectors.getMaxPage({ pagination })
    const where = pagination.get('where')
    const lastPage = pagination.getIn(['pages', where, 'last'])

    if (maxPage < lastPage) {
      actions.loadPage(minPage + 5)(dispatch, getState)
    }
  },
  loadPrevMinPage: () => (dispatch, getState) => {
    const { pagination } = getState()
    const minPage = selectors.getMinPage({ pagination })
    if (minPage > 1) {
      actions.loadPage(minPage - 5)(dispatch, getState)
    }
  },
}

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { meta }) => {
      return state.setIn(['pages', meta.where, 'current'], meta.page)
    },
    [types.pagination.SET_PAGE]: (state, { payload }) => {
      const where = state.get('where')
      return state.setIn(['pages', where, 'current'], payload.page)
    },
    [types.pagination.SET_LAST_PAGE]: (state, { payload }) =>
      state.setIn(['pages', payload.where, 'last'], payload.total / perPage),
  },
  initialState,
)

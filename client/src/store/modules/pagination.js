import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import { createSelector } from 'reselect'
import api from 'api'
import { normalize, schema } from 'normalizr'
import range from 'lodash/range'
import types from 'store/actionTypes'

// normalizr
const articleSchema = new schema.Entity('articles', {}, { idAttribute: '_id' })
const articleListSchema = [articleSchema]

const initialState = fromJS({
  articles: {
    category: 'all',
    perPage: 0,
    current: 0,
    pageCount: 0,
    buttonsPerPage: 5,
  },
})

export const getCategory = ({ pagination }) =>
  pagination.getIn(['articles', 'category'])
export const getCurrentPage = ({ pagination }) =>
  pagination.getIn(['articles', 'current'])
export const getLastPage = ({ pagination }) =>
  pagination.getIn(['articles', 'pageCount'])
export const getButtonsPerPage = ({ pagination }) =>
  pagination.getIn(['articles', 'buttonsPerPage'])

/* eslint-disable no-mixed-operators, arrow-parens */
export const getMinPage = createSelector(
  getCurrentPage,
  getButtonsPerPage,
  (currentPage, buttonsPerPage) => {
    const N = Math.ceil(currentPage / buttonsPerPage)
    return 5 * N - 4
  },
)
export const getMaxPage = createSelector(
  getCurrentPage,
  getLastPage,
  getButtonsPerPage,
  (currentPage, lastPage, buttonsPerPage) => {
    const N = Math.ceil(currentPage / buttonsPerPage)
    return lastPage < 5 * N ? lastPage : 5 * N
  },
)
export const getRangeMinMax = createSelector(
  getMinPage,
  getMaxPage,
  (min, max) => range(min, max + 1),
)

export const loadArticles = (category, page) => async dispatch => {
  dispatch({ type: types.article.REQUEST })

  try {
    const { data: { articles, total, perPage } } = await api.get(`/articles/${category}/${page}`)

    if (articles.length) {
      dispatch({
        type: types.article.SUCCESS,
        payload: normalize(articles, articleListSchema),
        meta: {
          page,
          category,
          perPage,
          total,
        },
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.article.ERROR, payload: error })
  }
}

export default handleActions(
  {
    [types.article.SUCCESS]: (state, { meta }) => {
      if (meta) {
        return state
          .setIn(['articles', 'current'], meta.page)
          .setIn(['articles', 'perPage'], meta.perPage)
          .setIn(
            ['articles', 'pageCount'],
            Math.ceil(meta.total / meta.perPage),
          )
      }
      return state
    },
    '@@router/LOCATION_CHANGE': (state, { payload }) => {
      const routerMatch = payload.pathname.match(/\/(all|dogdrip)\/(\d{1,})/)
      const oldCategory = state.getIn(['articles', 'category'])
      const oldPage = state.getIn(['articles', 'current'])

      if (routerMatch) {
        // 홈을 제외한 어떤 카테고리든 선택
        const [, newCategory = 'all', nextPage = '1'] = routerMatch
        const changingCategory = oldCategory !== newCategory
        const changingPage = !changingCategory && oldPage !== nextPage

        if (changingCategory || changingPage) {
          return state
            .setIn(['articles', 'category'], newCategory)
            .setIn(['articles', 'current'], parseInt(nextPage, 10))
        }
      }
      return state
        .setIn(['articles', 'category'], 'all')
        .setIn(['articles', 'current'], 1)
    },
  },
  initialState,
)

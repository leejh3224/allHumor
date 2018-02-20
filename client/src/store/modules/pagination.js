import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import api from 'api'
import { articleListSchema, commentListSchema } from 'store/schema'
import { normalize } from 'normalizr'
import types from 'store/actionTypes'
import isEmpty from 'lodash/isEmpty'

const initialState = fromJS({
  articles: {
    category: 'humor',
    perPage: 0,
    current: 1,
    pageCount: 0,
  },
  comments: {
    articleId: 0,
    perPage: 0,
    current: 1,
    pageCount: 0,
  },
  search: {
    perPage: 0,
    current: 1,
    pageCount: 0,
  },
})

export const getArticlesCategory = ({ pagination }) => pagination.getIn(['articles', 'category'])
export const getArticlesCurrentPage = ({ pagination }) => pagination.getIn(['articles', 'current'])
export const getArticlesLastPage = ({ pagination }) => pagination.getIn(['articles', 'pageCount'])

export const getArticleId = ({ pagination }) => pagination.getIn(['comments', 'articleId'])
export const getCommentsCurrentPage = ({ pagination }) => pagination.getIn(['comments', 'current'])
export const getCommentsLastPage = ({ pagination }) => pagination.getIn(['comments', 'pageCount'])

export const loadArticles = (category, page) => async (dispatch, getState) => {
  dispatch({ type: types.article.REQUEST })

  const state = getState()
  const categoryInStore = getArticlesCategory(state)
  const currentPageInStore = getArticlesCurrentPage(state)

  try {
    const { data: { articles, total, perPage } } = await api.get(
      `/articles/${category || categoryInStore}/${page || currentPageInStore}`,
    )

    if (articles) {
      dispatch({
        type: types.article.SUCCESS,
        payload: {
          data: normalize(articles, articleListSchema),
          page,
          category,
          perPage,
          total,
        },
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.article.ERROR, payload: { error } })
  }
}

export const loadComments = () => async (dispatch, getState) => {
  const articleId = getArticleId(getState())
  const currentPage = getCommentsCurrentPage(getState())

  dispatch({ type: types.comment.REQUEST })

  try {
    const { data: { comments, perPage, total } } = await api.get(
      `/comments/${articleId}/page/${currentPage}`,
    )

    if (comments) {
      dispatch({
        type: types.comment.SUCCESS,
        payload: {
          data: normalize(comments, commentListSchema),
          perPage,
          total,
        },
      })
    }
  } catch (error) {
    console.log(error)
    dispatch({ type: types.comment.ERROR, payload: { error } })
  }
}

export default handleActions(
  {
    [types.article.SUCCESS]: (
      state,
      {
        payload: {
          data: { result }, page, perPage, total, category,
        },
      },
    ) => {
      const [articleId] = result

      // list of articles
      if (page) {
        return state
          .setIn(['articles', 'current'], page)
          .setIn(['articles', 'perPage'], perPage)
          .setIn(['articles', 'category'], category)
          .setIn(['articles', 'pageCount'], Math.ceil(total / perPage))
      }
      return state
        .setIn(['comments', 'articleId'], articleId)
        .setIn(['comments', 'current'], 1)
        .setIn(['comments', 'pageCount'], 0)
    },
    [types.comment.SUCCESS]: (state, { payload: { data: { entities }, perPage, total } }) => {
      if (!isEmpty(entities)) {
        return state
          .setIn(['comments', 'current'], state.getIn(['comments', 'current']) + 1)
          .setIn(['comments', 'perPage'], perPage)
          .setIn(['comments', 'pageCount'], Math.ceil(total / perPage))
      }
      return state
        .setIn(['comments', 'perPage'], perPage)
        .setIn(['comments', 'pageCount'], Math.ceil(total / perPage))
    },
    '@@router/LOCATION_CHANGE': (state, { payload }) => {
      const routerMatch = payload.pathname.match(/\/(humor|soccer|bitcoin|idol)/)
      const oldCategory = state.getIn(['articles', 'category'])
      const oldPage = state.getIn(['articles', 'current'])

      if (routerMatch) {
        // 홈을 제외한 어떤 카테고리든 선택
        const [, newCategory = 'humor', nextPage = '1'] = routerMatch
        const changingCategory = oldCategory !== newCategory
        const changingPage = !changingCategory && oldPage !== nextPage

        if (changingCategory || changingPage) {
          return state
            .setIn(['articles', 'category'], newCategory)
            .setIn(['articles', 'current'], parseInt(nextPage, 10))
        }
      }
      return state.setIn(['articles', 'category'], 'humor').setIn(['articles', 'current'], 1)
    },
  },
  initialState,
)

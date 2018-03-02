import { Map, fromJS } from 'immutable'

import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

function computePageCount(total, perPage) {
  return Math.ceil(total / perPage)
}

const createPaginationReducer = prefix =>
  createReducer(
    types[prefix]
      ? {
        [types[prefix].SUCCESS](state, { meta: { current, perPage, total } }) {
          const newState = fromJS({
            current,
            perPage,
            pageCount: computePageCount(total, perPage),
          })
          return state.merge(newState)
        },
        [types.article.SUCCESS](state, { payload }) {
          if (prefix === 'comment') {
            const id = [payload.result]
            const { comments } = payload.entities.article[id]
            const COMMENTS_PER_PAGE = 20
            const haveMoreToLoad = comments.length >= COMMENTS_PER_PAGE
            const newState = fromJS({
              current: 1,
              perPage: COMMENTS_PER_PAGE,
              pageCount: haveMoreToLoad
                ? 2
                : computePageCount(comments.length, COMMENTS_PER_PAGE),
            })
            return state.merge(newState)
          }
          return state
        },
      }
      : {},
    Map({
      perPage: 0,
      current: 0,
      pageCount: 0,
    }),
  )

export default createPaginationReducer

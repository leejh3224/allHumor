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
        [types[prefix].SUCCESS](state, { meta: { perPage, total } }) {
          const newState = fromJS({
            current: state.get('current') + 1,
            perPage,
            pageCount: computePageCount(total, perPage),
          })
          return state.merge(newState)
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

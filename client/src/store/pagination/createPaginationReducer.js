import { Map } from 'immutable'

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
          return state
            .set('current', state.get('current') + 1)
            .set('perPage', perPage)
            .set('pageCount', computePageCount(total, perPage))
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

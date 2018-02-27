import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

const createFetchingReducer = prefix =>
  createReducer(
    types[prefix]
      ? {
        [types[prefix].REQUEST]() {
          return true
        },
        [types[prefix].SUCCESS]() {
          return false
        },
        [types[prefix].ERROR]() {
          return false
        },
      }
      : {},
    false,
  )

export default createFetchingReducer

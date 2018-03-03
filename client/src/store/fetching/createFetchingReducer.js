import { LOCATION_CHANGE } from 'react-router-redux'

import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

const createFetchingReducer = (prefix, sufix) => {
  const getType = key => (sufix ? `${sufix.toUpperCase()}_${key}` : key)
  return createReducer(
    types[prefix]
      ? {
        [types[prefix][getType('REQUEST')]]() {
          return true
        },
        [types[prefix][getType('SUCCESS')]]() {
          return false
        },
        [types[prefix][getType('ERROR')]]() {
          return false
        },
        [LOCATION_CHANGE]() {
          return false
        },
      }
      : {},
    false,
  )
}

export default createFetchingReducer

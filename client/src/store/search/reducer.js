import { OrderedMap, Map } from 'immutable'
import { combineReducers } from 'redux-immutable'
import { LOCATION_CHANGE } from 'react-router-redux'

import types from 'store/actionTypes'
import { createReducer } from 'store/utils'

const result = createReducer(
  {
    [types.search.REQUEST](state) {
      return state.clear()
    },
    [types.search.SUCCESS](state, { payload }) {
      return state.merge(payload.entities.previews)
    },
    [LOCATION_CHANGE](state) {
      return state.clear(state)
    },
  },
  OrderedMap(),
)

const status = createReducer(
  {
    [types.search.SUCCESS](state) {
      return state.set('finished', true)
    },
    [LOCATION_CHANGE](state) {
      return state.clear(state)
    },
  },
  Map({
    finished: false,
  }),
)

export default combineReducers({ result, status })

export const getSearchResult = state => Object.values(state.getIn(['search', 'result']).toJS())
export const getFinished = state => state.getIn(['search', 'status', 'finished'])

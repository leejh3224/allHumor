import { combineReducers } from 'redux'

import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

const loginView = createReducer(
  {
    [types.ui.SWITCH_LOGIN_VIEW](state) {
      return !state
    },
  },
  false,
)

export default combineReducers({
  loginView,
})

export const getLoginView = state => state.getIn(['ui', 'loginView'])

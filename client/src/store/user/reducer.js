import { Map } from 'immutable'

import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

export default createReducer(
  {
    [types.user.SET_USER_PROFILE]: (state, { payload: profile }) => state.merge(profile),
  },
  Map({
    userId: '',
    avatar: '',
    displayName: '',
  }),
)

export const getUserId = state => state.getIn(['user', 'userId'])
export const getProfile = state => state.get('user').toJS()

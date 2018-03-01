import types from 'store/actionTypes'

export const setUserProfile = profile => ({
  type: types.user.SET_USER_PROFILE,
  payload: profile,
})

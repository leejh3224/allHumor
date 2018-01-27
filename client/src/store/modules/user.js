import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'

const initialState = fromJS({
  userId: '',
  avatar: '',
  displayName: '',
})

export const getUserId = ({ user }) => user.get('userId')
export const getAvatar = ({ user }) => user.get('avatar')
export const getDisplayName = ({ user }) => user.get('displayName')

export const setUserProfile = profile => (dispatch) => {
  dispatch({ type: types.user.SET_USER_PROFILE, payload: profile })
}

export default handleActions(
  {
    [types.user.SET_USER_PROFILE]: (state, { payload }) =>
      state
        .set('userId', payload.userId)
        .set('avatar', payload.avatar)
        .set('displayName', payload.displayName),
  },
  initialState,
)

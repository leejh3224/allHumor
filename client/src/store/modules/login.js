import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'

const initialState = fromJS({
  view: 'login',
  userProfile: null,
})

export const actions = {
  switchView: () => (dispatch) => {
    dispatch({ type: types.login.SWITCH_VIEW })
  },
  setUserProfile: profile => (dispatch) => {
    dispatch({ type: types.login.SET_USER_PROFILE, payload: profile })
  },
}

export const selectors = {
  getView: ({ login }) => login.get('view'),
}

export default handleActions(
  {
    [types.login.SWITCH_VIEW]: (state) => {
      const prevView = state.get('view')
      if (prevView === 'login') {
        return state.set('view', 'register')
      }
      return state.set('view', 'login')
    },
    [types.login.SET_USER_PROFILE]: (state, payload) =>
      state.set('userProfile', payload),
  },
  initialState,
)

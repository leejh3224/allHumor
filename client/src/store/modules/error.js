import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'

const initialState = fromJS({
  error: null,
})

export default handleActions(
  {
    [types.article.ERROR]: (state, { payload }) => state.set('error', payload.err),
  },
  initialState,
)

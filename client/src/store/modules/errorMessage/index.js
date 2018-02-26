import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

const errorMessage = createReducer(
  {
    [types.app.API_ERROR](state, { payload }) {
      return payload
    },
  },
  null,
)

export default errorMessage

export const getErrorMessage = state => state.errorMessage

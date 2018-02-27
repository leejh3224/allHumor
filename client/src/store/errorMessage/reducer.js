import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

const errorMessage = createReducer(
  {
    [types.previewList.ERROR](state, { payload }) {
      return payload
    },
    [types.article.ERROR](state, { payload }) {
      return payload
    },
  },
  null,
)

export default errorMessage

export const getErrorMessage = state => state.errorMessage

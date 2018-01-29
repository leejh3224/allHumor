import { fromJS } from 'immutable'
import { handleActions } from 'redux-actions'
import types from 'store/actionTypes'

const initialState = fromJS({
  error: null,
})

export default handleActions(
  {
    [types.article.ERROR]: (state, { payload }) =>
      state.set('error', payload.error),
    [types.voting.ERROR]: (state, { payload }) =>
      state.set('error', payload.error),
    [types.reply.ERROR]: (state, { payload }) =>
      state.set('error', payload.error),
    [types.comment.ERROR]: (state, { payload }) =>
      state.set('error', payload.error),
  },
  initialState,
)

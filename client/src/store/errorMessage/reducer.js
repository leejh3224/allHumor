import { createReducer } from 'store/utils'
import types from 'store/actionTypes'

function createReducerMap(entities) {
  return entities.reduce(
    (obj, entity) => ({
      ...obj,
      [types[entity].ERROR](state, { payload }) {
        return payload
      },
      [types[entity].ADD_ERROR](state, { payload }) {
        return payload
      },
      [types[entity].EDIT_ERROR](state, { payload }) {
        return payload
      },
      [types[entity].REMOVE_ERROR](state, { payload }) {
        return payload
      },
      [types[entity].ADD_REPLY_ERROR](state, { payload }) {
        return payload
      },
      [types[entity].REPLY_ERROR](state, { payload }) {
        return payload
      },
    }),
    {},
  )
}

const errorMessage = createReducer(
  createReducerMap(['previewList', 'article', 'comment', 'search', 'voting']),
  null,
)

export default errorMessage

export const getErrorMessage = state => state.get('errorMessage')

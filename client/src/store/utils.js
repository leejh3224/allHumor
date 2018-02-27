import { normalize } from 'normalizr'

import api from 'api'
import * as schemas from 'store/schema'
import { getFetching } from 'store/fetching/reducer'

/* eslint-disable no-prototype-builtins */
export function createReducer(handlers, initialState) {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    }
    return state
  }
}

// to replace lodash omit
// https://github.com/lodash/lodash/issues/2930
export const omit = (properties = [], object) => {
  if (!Array.isArray(properties)) {
    throw new Error('parameter "properties" should be array')
  }

  const copy = Object.assign({}, object)
  properties.forEach(prop => {
    delete copy[prop]
  })
  return copy
}

export function getPlural(entity) {
  if (entity === 'reply') {
    return 'replies'
  }
  return `${entity}s`
}

export const createFetchThunk = ({
  entity,
  fetchingKey,
  requestTypes: [REQUEST, SUCCESS, ERROR],
  url,
  method,
}) => (dispatch, getState) => {
  const inRequest = getFetching(getState(), fetchingKey)

  if (inRequest) {
    return null
  }

  dispatch({ type: REQUEST })

  const options = {
    url,
    method,
  }

  return api.request(options).then(
    ({ data }) => {
      const target = getPlural(entity)

      if (data[target] || data[entity]) {
        const schema = schemas[`${entity}ListSchema`] || schemas[`${entity}Schema`]
        const normalizedData = normalize(data[target] || data[entity], schema)

        dispatch({
          type: SUCCESS,
          payload: normalizedData,
          meta: omit([target], data),
        })
      }
    },
    error => {
      let { message } = error
      if (error.response.status === 500) {
        message = '서버 연결 오류(500)'
      }
      dispatch({ type: ERROR, payload: message })
    },
  )
}

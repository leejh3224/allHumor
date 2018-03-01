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

export const createFetchThunk = (dispatch, getState) => ({
  entity,
  fetchingKey = entity,
  requestTypes: [REQUEST, SUCCESS, ERROR],
  requestPayload,
  url,
  method,
  body,
}) => {
  const inRequest = getFetching(getState(), fetchingKey)

  if (inRequest) {
    return null
  }

  dispatch({ type: REQUEST, payload: requestPayload })

  const options = {
    url,
    method,
    data: body,
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

      if (method === 'delete') {
        dispatch({
          type: SUCCESS,
          payload: requestPayload,
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

export const withNewState = (object, newState) =>
  Object.values(object).reduce(
    (obj, entity) => ({
      ...obj,
      [entity._id]: newState,
    }),
    {},
  )

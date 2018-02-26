import { normalize } from 'normalizr'

import api from 'api'
import types from 'store/actionTypes'
import * as schemas from 'store/schema'

function getPlural(entity) {
  if (entity === 'reply') {
    return 'replies'
  }
  return `${entity}s`
}

export default ({ dispatch }) => next => action => {
  next(action)
  if (action.type === types.app.API_REQUEST) {
    const {
      entity, url, method, onSuccess,
    } = action.meta

    const options = {
      url,
      method,
      onSuccess,
    }

    if (action.payload) {
      options.body = action.payload.body
    }

    return api.request(options).then(
      ({ data }) => {
        const target = data[getPlural(entity)]

        if (target) {
          const schema = schemas[`${entity}ListSchema`]
          const normalizedData = normalize(target, schema)

          dispatch({ type: onSuccess, payload: normalizedData })
        }
      },
      error => {
        let { message } = error
        if (error.response.status === 500) {
          message = '서버 연결 오류(500)'
        }
        dispatch({ type: types.app.API_ERROR, payload: message })
      },
    )
  }
  return null
}

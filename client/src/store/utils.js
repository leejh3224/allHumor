export const createReducer = (handlers, initialState) => (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action)
  }
  return state
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

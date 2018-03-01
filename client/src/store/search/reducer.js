import { OrderedMap } from 'immutable'

import { createReducer } from 'store/utils'

const result = createReducer({}, OrderedMap())

export default result

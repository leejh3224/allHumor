import { schema } from 'normalizr'

import { getPlural } from 'store/utils'

const createListSchema = (key, options) => {
  const entitySchema = new schema.Entity(getPlural(key), {}, { idAttribute: '_id', ...options })
  return [entitySchema]
}

const createEntitySchema = (key, options) =>
  new schema.Entity(key, {}, { idAttribute: '_id', ...options })

export const previewListSchema = createListSchema('preview')
export const articleSchema = createEntitySchema('article')
export const voteListSchema = createListSchema('vote', { idAttribute: 'userId' })
export const commentListSchema = createListSchema('comment')

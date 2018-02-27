import { schema } from 'normalizr'

import { getPlural } from 'store/utils'

const createListSchema = key => {
  const entitySchema = new schema.Entity(getPlural(key), {}, { idAttribute: '_id' })
  return [entitySchema]
}

const createEntitySchema = key => new schema.Entity(key, {}, { idAttribute: '_id' })

export const previewListSchema = createListSchema('preview')
export const articleSchema = createEntitySchema('article')

const commentSchema = new schema.Entity('comments', {}, { idAttribute: '_id' })
export const commentListSchema = [commentSchema]

const replySchema = new schema.Entity('replies', {}, { idAttribute: '_id' })
export const replyListSchema = [replySchema]

const voteSchema = new schema.Entity(
  'votes',
  {},
  { idAttribute: 'userId' }, // 한 게시물 내에서는 유저의 표가 unique하므로
)
export const voteListSchema = [voteSchema]

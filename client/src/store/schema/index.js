import { schema } from 'normalizr'

const articleSchema = new schema.Entity('articles', {}, { idAttribute: '_id' })
export const articleListSchema = [articleSchema]

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

import mongoose from 'mongoose'
import Comment from './Comment'

const { Schema } = mongoose

// _id: false => custom _id
const Article = new Schema(
  {
    // 사이트 별 고유 article id
    articleId: { type: String, required: true },
    uploadDate: { type: Date, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    thumbnail: String,
    content: { type: String, required: true },
    site: { type: String, required: true },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    upvotedUsers: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
)

Article.post('remove', async (doc, next) => {
  const { _id } = doc
  try {
    await Comment.remove({ articleId: _id })
    console.log('comment removed')
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default mongoose.model('Article', Article)

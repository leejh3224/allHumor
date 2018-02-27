import mongoose from 'mongoose'
import Comment from './Comment'

const { Schema } = mongoose

// _id: false => custom _id
const Article = new Schema(
  {
    author: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, required: true },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    originalLink: { type: String, required: true },
    title: { type: String, required: true },
    thumbnail: String,
    uploadDate: { type: Date, required: true },
    votes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Vote',
      },
    ],
  },
  { timestamps: true },
)

Article.index({ author: 'text', title: 'text', body: 'text' })

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

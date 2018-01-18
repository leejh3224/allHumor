import mongoose from 'mongoose'
import Article from './Article'

const { Schema } = mongoose

const Comment = new Schema(
  {
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
    author: { type: String, required: true },
    content: { type: String, required: true },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Commment',
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

Comment.post('save', async (doc, next) => {
  const { _id } = doc
  try {
    await Article.findByIdAndUpdate(doc.articleId, { $push: { comments: _id } })
    console.log('comment saved')
  } catch (error) {
    console.log(error)
    next(error)
  }
})

Comment.post('remove', async (doc, next) => {
  const { _id } = doc
  try {
    await Article.findByIdAndUpdate(doc.articleId, { $pull: { comments: _id } })
    console.log('comment removed')
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default mongoose.model('Comment', Comment)

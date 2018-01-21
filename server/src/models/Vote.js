import mongoose from 'mongoose'
import Article from './Article'

const { Schema } = mongoose

// counts_limit: 25
const Vote = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'Article',
      required: true,
    },
    counts: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
)

Vote.post('save', async (doc, next) => {
  const { _id } = doc
  try {
    await Article.findByIdAndUpdate(doc.articleId, { $push: { votes: _id } })
    console.log('vote initialized!')
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default mongoose.model('Vote', Vote)

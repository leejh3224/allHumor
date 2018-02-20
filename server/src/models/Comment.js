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
    userId: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    author: { type: String, required: true },
    content: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Comment' },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    recipient: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
)

/* eslint-disable func-names */
// workaround for "Empty array is saved when a property references a schema"
// https://github.com/Automattic/mongoose/issues/1335#issuecomment-13254654
Comment.pre('save', function (next) {
  if (this.isNew && this.recipient) {
    this.replies = undefined
  }
  next()
})

Comment.post('save', async (doc, next) => {
  const { _id, recipient, parent } = doc
  if (recipient) {
    try {
      await mongoose.model('Comment', Comment).findByIdAndUpdate(parent, {
        $push: { replies: _id },
      })
      console.log('reply added')
    } catch (error) {
      console.log(error)
      next(error)
    }
  } else {
    try {
      await Article.findByIdAndUpdate(doc.articleId, { $push: { comments: _id } })
      console.log('comment saved')
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
})

Comment.post('remove', async (doc, next) => {
  const { _id, recipient, parent } = doc
  if (recipient) {
    try {
      await mongoose
        .model('Comment', Comment)
        .findByIdAndUpdate(parent, { $pull: { replies: _id } })
      console.log('reply removed')
    } catch (error) {
      console.log(error)
      next(error)
    }
  } else {
    try {
      await Article.findByIdAndUpdate(doc.articleId, { $pull: { comments: _id } })
      console.log('comment removed')
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
})

export default mongoose.model('Comment', Comment)

import mongoose from 'mongoose'

const { Schema } = mongoose

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.model('User', User)

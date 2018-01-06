import mongoose from 'mongoose'

const { Schema } = mongoose

// _id false => custom _id
const Article = new Schema({
  _id: false,
  uploadDate: { type: Date, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  thumbnail: String,
  content: { type: String, required: true },
  type: { type: String, required: true },
})

export default mongoose.model('Article', Article)

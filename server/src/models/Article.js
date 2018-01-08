import mongoose from 'mongoose'

const { Schema } = mongoose

// _id: false => custom _id
const Article = new Schema({
  // 사이트 별 고유 article id
  articleId: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  thumbnail: String,
  content: { type: String, required: true },
  site: { type: String, required: true },
})

export default mongoose.model('Article', Article)

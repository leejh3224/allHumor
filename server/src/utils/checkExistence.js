import Article from 'models/Article'

export default async function checkExistence(link) {
  const exists = (await Article.find({ originalLink: link }).count()) > 0
  return exists
}

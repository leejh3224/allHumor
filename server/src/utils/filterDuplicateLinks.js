import Article from 'models/Article'

async function checkExistence(link) {
  const existingArticle = await Article.find({ originalLink: link })
  return !!existingArticle
}

export default links => Promise.all(links.filter(link => checkExistence(link)))

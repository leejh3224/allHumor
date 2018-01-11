import Article from 'models/Article'
import omit from 'lodash/omit'

export default {
  getArticlesByCategory: async (req, res) => {
    const { category, page } = req.params
    const perPage = 10

    // find all for category all
    const findQuery = category === 'all' ? {} : { site: category }

    // lean option -> to js object
    try {
      const total = await Article.find().count()
      let articles = await Article.find(findQuery)
        .skip(perPage * (page - 1))
        .limit(perPage)
        .sort({ uploadDate: -1 })
        .lean()

      articles = articles.map(article => omit(article, ['__v']))

      res.json({ articles, total })
    } catch (error) {
      res.json({
        error,
      })
    }
  },
  getArticle: async (req, res) => {
    const { id } = req.params

    try {
      let article = await Article.findById(id).lean()
      article = omit(article, ['__v'])
      res.json({
        articles: [article],
      })
    } catch (error) {
      console.log(error)
      res.json({ error })
    }
  },
}

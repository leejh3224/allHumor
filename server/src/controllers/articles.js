import Article from 'models/Article'
import omit from 'lodash/omit'

export default {
  getArticlesDogdrip: async (req, res) => {
    const { page } = req.params
    const perPage = 10

    // lean option -> to js object
    try {
      let articles = await Article.find({ type: 'dogdrip' })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .sort({ uploadDate: -1 })
        .lean()

      articles = articles.map(article => omit(article, ['__v']))

      res.json({ articles, page })
    } catch (error) {
      res.json({
        error,
      })
    }
  },
}

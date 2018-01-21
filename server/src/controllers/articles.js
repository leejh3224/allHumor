import Article from 'models/Article'
import Vote from 'models/Vote'
import mongoose from 'mongoose'
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

    // aggregation pipeline operators
    const match = {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    }
    const lookup = {
      $lookup: {
        from: 'votes',
        localField: 'votes',
        foreignField: '_id',
        as: 'voteInfo',
      },
    }
    const addField = {
      $addFields: {
        voteCounts: { $sum: '$voteInfo.counts' },
      },
    }

    try {
      let [article] = await Article.aggregate([match, lookup, addField])
      article = omit(article, ['__v'])
      res.json({
        articles: [article],
      })
    } catch (error) {
      console.log(error)
      res.json({ error })
    }
  },
  startVotingArticle: async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    try {
      const vote = await new Vote({
        userId,
        counts: 1,
        articleId: id,
      }).save()
      res.json({
        success: true,
        votes: [vote],
      })
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error,
      })
    }
  },
  voteArticle: async (req, res) => {
    const { id } = req.params
    const { userId } = req.body

    try {
      const vote = await Vote.findOne({ articleId: id, userId })

      if (vote.counts < 25) {
        await Vote.update({ articleId: id, userId }, { counts: vote.counts + 1 })
      }

      console.log(vote)

      res.json({
        success: true,
        votes: [vote],
      })
    } catch (error) {
      console.log(error)
      res.json({
        error,
      })
    }
  },
}

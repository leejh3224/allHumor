import Article from 'models/Article'
import Vote from 'models/Vote'
import mongoose from 'mongoose'
import omit from 'lodash/omit'

export default {
  getArticles: async (req, res) => {
    const { category, page } = req.params
    const PER_PAGE = 10
    const { keyword } = req.query

    // find all for category all
    let findQuery = category === 'all' ? {} : { site: category }

    if (keyword) {
      findQuery = Object.assign(findQuery, { $text: { $search: keyword } })
    }

    // aggregation
    const match = {
      $match: findQuery,
    }

    const lookupForVotes = {
      $lookup: {
        from: 'votes',
        localField: 'votes',
        foreignField: '_id',
        as: 'votes',
      },
    }
    const addFieldVoteCounts = {
      $addFields: {
        voteCount: { $sum: '$votes.counts' },
        commentCount: { $size: '$comments' },
      },
    }
    const sort = {
      $sort: { uploadDate: -1 },
    }
    const excludeFieldVotes = {
      $project: {
        votes: false,
        comments: false,
      },
    }
    const skip = {
      $skip: PER_PAGE * (page - 1),
    }
    const limit = {
      $limit: PER_PAGE,
    }
    const pipeline = [
      match,
      lookupForVotes,
      addFieldVoteCounts,
      sort,
      excludeFieldVotes,
      skip,
      limit,
    ].filter(pipe => pipe)

    try {
      const total = await Article.find(findQuery).count()
      let articles = await Article.aggregate(pipeline)

      articles = articles.map(article => omit(article, ['__v', 'site', 'content']))

      res.json({
        articles,
        total,
        perPage: PER_PAGE,
      })
    } catch (error) {
      res.json({
        error,
      })
    }
  },
  getArticle: async (req, res) => {
    const { id } = req.params
    const COMMETNS_PER_PAGE = 20

    const match = {
      $match: {
        // way to match objectId
        _id: new mongoose.Types.ObjectId(id),
      },
    }
    const lookupForVotes = {
      $lookup: {
        from: 'votes',
        localField: 'votes',
        foreignField: '_id',
        as: 'votes',
      },
    }
    const addField = {
      $addFields: {
        voteCount: { $sum: '$votes.counts' },
      },
    }
    const lookUpForComments = {
      $lookup: {
        from: 'comments',
        pipeline: [
          {
            $match: {
              articleId: new mongoose.Types.ObjectId(id),
              replies: { $exists: true },
            },
          },
          {
            $sort: { createdAt: -1 },
          },
          {
            $limit: COMMETNS_PER_PAGE,
          },
        ],
        as: 'comments',
      },
    }

    try {
      let [article] = await Article.aggregate([match, lookupForVotes, addField, lookUpForComments])
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
      await new Vote({
        userId,
        counts: 1,
        articleId: id,
      }).save()
      res.json({
        success: true,
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

      res.json({
        success: true,
      })
    } catch (error) {
      console.log(error)
      res.json({
        error,
      })
    }
  },
}

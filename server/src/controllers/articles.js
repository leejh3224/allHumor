import omit from 'lodash/omit'

import Article from 'models/Article'
import Vote from 'models/Vote'
import mongoose from 'mongoose'

export default {
  getPreviews: async (req, res) => {
    const { category, page } = req.params
    const PER_PAGE = 10
    const { keyword } = req.query
    let findQuery = { category }

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
        commentCount: { $add: [{ $size: '$comments' }, { $sum: { $size: '$comments.reply' } }] },
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
      let previews = await Article.aggregate(pipeline)

      previews = previews.map(article =>
        omit(article, ['__v', 'body', 'originalLink', 'updatedAt', 'articleId', 'createdAt']))

      res.json({
        previews,
        total,
        perPage: PER_PAGE,
      })
    } catch (error) {
      throw new Error(error)
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
      article = omit(article, ['__v', 'createdAt', 'updatedAt', 'thumbnail'])
      res.json({
        article,
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

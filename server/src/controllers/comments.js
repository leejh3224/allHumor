import Comment from 'models/Comment'

export default {
  getComments: async (req, res) => {
    const { articleId, page } = req.params
    const PER_PAGE = 20
    const loaded = PER_PAGE * page
    const notReplies = { articleId, replies: { $exists: true } }

    try {
      const total = await Comment.find(notReplies).count()
      const comments = await Comment.find(notReplies)
        .sort({ createdAt: -1 })
        .skip(total < 20 ? 0 : total - loaded)
        .limit(PER_PAGE)

      res.json({
        comments,
        total,
        perPage: PER_PAGE,
      })
    } catch (error) {
      console.log(error)
      res.json({
        error,
      })
    }
  },
  addComment: async (req, res) => {
    const {
      articleId, userId, avatar, author, content,
    } = req.body

    try {
      const comment = await new Comment({
        articleId,
        userId,
        avatar,
        author,
        content,
        replies: [],
      }).save()

      res.json({
        comments: [comment],
      })
    } catch (error) {
      console.log(error)
      res.json({
        error,
      })
    }
  },
  editComment: async (req, res) => {
    const { id } = req.params
    const { content } = req.body

    try {
      const comment = await Comment.findByIdAndUpdate(id, { content }, { new: true })
      res.json({
        id,
        comments: [comment],
      })
    } catch (error) {
      console.log(error)
      res.json({
        id,
        error,
      })
    }
  },
  removeComment: async (req, res) => {
    const { id } = req.params // delete 요청은 body를 사용할 수 없음

    try {
      // workaround for "Remove hook not triggered when removing documents"\
      // https://github.com/Automattic/mongoose/issues/1241
      Comment.findByIdAndRemove(id, (err, doc) => {
        doc.remove()
      })

      res.json({
        id,
      })
    } catch (error) {
      console.log(error)
      res.json({
        id,
        error,
      })
    }
  },
  getReplies: async (req, res) => {
    const { parent } = req.params

    try {
      const { replies: comments } = await Comment.findById(parent)
        .populate({
          path: 'replies',
          options: {
            sort: {
              createdAt: -1,
            },
          },
        })
        .lean()
      res.json({
        id: parent,
        comments,
      })
    } catch (error) {
      console.log(error)
      res.json({
        id: parent,
        error,
      })
    }
  },
  addReply: async (req, res) => {
    const { parent } = req.params

    try {
      const {
        userId, avatar, author, content,
      } = req.body
      const { _id, articleId, ...rest } = await Comment.findById(parent).lean()
      const comment = await new Comment({
        articleId,
        userId,
        avatar,
        author,
        content,
        parent: _id,
        recipient: rest.author,
      }).save()
      res.json({
        id: parent,
        comments: [comment],
      })
    } catch (error) {
      console.log(error)
      res.json({
        id: parent,
        error,
      })
    }
  },
}

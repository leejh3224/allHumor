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
        success: true,
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
        success: true,
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
        success: true,
        comments: [comment],
      })
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
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
  getAllReply: async (req, res) => {
    try {
      const { id } = req.params
      const { replies } = await Comment.findById(id)
        .populate('replies')
        .lean()
      res.json({
        success: true,
        replies,
      })
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error,
      })
    }
  },
  addReply: async (req, res) => {
    try {
      const { id } = req.params
      const {
        userId, avatar, author, content,
      } = req.body
      const { _id, articleId, ...parent } = await Comment.findById(id).lean()
      const reply = await new Comment({
        articleId,
        userId,
        avatar,
        author,
        content,
        parent: _id,
        recipient: parent.author,
      }).save()
      res.json({
        success: true,
        replies: [reply],
      })
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error,
      })
    }
  },
}

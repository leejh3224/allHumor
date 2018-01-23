import Comment from 'models/Comment'

export default {
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
      const comment = await Comment.findByIdAndUpdate(id, { content })
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
  deleteComment: async (req, res) => {
    const { id } = req.params // delete 요청은 body를 사용할 수 없음

    try {
      // workaround for "Remove hook not triggered when removing documents"\
      // https://github.com/Automattic/mongoose/issues/1241
      await Comment.findByIdAndRemove(id, (err, doc) => {
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
        userId, avatar, author, content, recipient,
      } = req.body
      const { _id, articleId, ...rest } = await Comment.findById(id).lean()
      const reply = await new Comment({
        articleId,
        userId,
        avatar,
        author,
        content,
        parent: _id,
        recipient: recipient || rest.author,
      }).save()
      await Comment.findByIdAndUpdate(id, {
        $push: { replies: reply._id },
      })
      res.json({
        success: true,
        comments: [reply],
      })
    } catch (error) {
      console.log(error)
      res.json({
        success: false,
        error,
      })
    }
  },
  editReply: () => {},
  deleteReply: () => {},
}

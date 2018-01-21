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
        upvotedUsers: [],
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
      /* 만약 post remove hook을 트리거하려면 이런 식으로 도큐먼트.remove를 사용해야함 */
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
}

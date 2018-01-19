import Comment from 'models/Comment'

export default {
  saveComment: async (req, res) => {
    const { articleId, author, content } = req.body

    try {
      const comment = await new Comment({
        articleId,
        author,
        content,
        replies: [],
        upvotedUsers: [],
      }).save()

      res.json({
        success: true,
        comment,
      })
    } catch (error) {
      console.log(error)
      res.json({
        error,
      })
    }
  },
  deleteComment: async (req, res) => {
    const { _id } = req.params // delete 요청은 body를 사용할 수 없음

    try {
      /* 만약 post remove hook을 트리거하려면 이런 식으로 도큐먼트.remove를 사용해야함 */
      await Comment.findByIdAndRemove(_id, (err, doc) => {
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

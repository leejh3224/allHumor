import Comment from 'models/Comment'

export default {
  saveComment: async (req, res) => {
    /* 만약 post remove hook을 트리거하려면 이런 식으로 도큐먼트.remove를 사용해야함 */
    // await Comment.findByIdAndRemove('5a60daf97dfc381c8f439f5f', (err, doc) => {
    //   doc.remove()
    // })

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
}

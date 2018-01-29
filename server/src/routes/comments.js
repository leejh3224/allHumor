import { Router } from 'express'
import commentsController from 'controllers/comments'

const routes = Router()

routes.get('/comments/:articleId/page/:page', commentsController.getComments)
routes.post('/comments', commentsController.addComment)
routes.put('/comments/:id', commentsController.editComment)
routes.delete('/comments/:id', commentsController.deleteComment)

routes.get('/comments/:id/replies', commentsController.getAllReply)
routes.post('/comments/:id/replies', commentsController.addReply)
routes.put('/comments/:commentId/replies/:replyId', commentsController.editReply)
routes.delete('/comments/:commentId/replies/:replyId', commentsController.deleteReply)

export default routes

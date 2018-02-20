import { Router } from 'express'
import commentsController from 'controllers/comments'

const routes = Router()

routes.get('/comments/:articleId/page/:page', commentsController.getComments)
routes.post('/comments', commentsController.addComment)
routes.put('/comments/:id', commentsController.editComment)
routes.delete('/comments/:id', commentsController.removeComment)

routes.get('/comments/:id/replies', commentsController.getReplies)
routes.post('/comments/:id/replies', commentsController.addReply)

export default routes

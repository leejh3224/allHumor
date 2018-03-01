import { Router } from 'express'
import commentsController from 'controllers/comments'

const routes = Router()

routes.get('/comments/:articleId/page/:page', commentsController.getComments)
routes.post('/comments', commentsController.addComment)
routes.put('/comments/:id', commentsController.editComment)
routes.delete('/comments/:id', commentsController.removeComment)

routes.get('/comments/:parent/replies', commentsController.getReplies)
routes.post('/comments/:parent/replies', commentsController.addReply)

export default routes

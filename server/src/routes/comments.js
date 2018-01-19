import { Router } from 'express'
import commentsController from 'controllers/comments'

const routes = Router()

routes.post('/comments', commentsController.saveComment)
routes.delete('/comments', commentsController.deleteComment)

export default routes

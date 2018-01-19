import { Router } from 'express'
import commentsController from 'controllers/comments'

const routes = Router()

routes.post('/comments', commentsController.saveComment)
routes.patch('/comments/:id', commentsController.editComment)
routes.delete('/comments/:id', commentsController.deleteComment)

export default routes

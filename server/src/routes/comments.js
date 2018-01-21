import { Router } from 'express'
import commentsController from 'controllers/comments'

const routes = Router()

routes.post('/comments', commentsController.addComment)
routes.put('/comments/:id', commentsController.editComment)
routes.delete('/comments/:id', commentsController.deleteComment)

export default routes

import { Router } from 'express'
import commentsController from 'controllers/comments'

const routes = Router()

routes.post('/comments', commentsController.saveComment)

export default routes

import { Router } from 'express'
import articlesController from 'controllers/articles'

const routes = Router()

routes.get('/articles/:category/:page', articlesController.getArticlesByCategory)

export default routes

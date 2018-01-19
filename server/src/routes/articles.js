import { Router } from 'express'
import articlesController from 'controllers/articles'

const routes = Router()

routes.get('/articles/:category/:page', articlesController.getArticlesByCategory)
routes.get('/articles/:id', articlesController.getArticle)
routes.put('/articles/:id/votes', articlesController.voteArticle)
routes.put('/articles/:id/cancelVotes', articlesController.cancelVotes)

export default routes

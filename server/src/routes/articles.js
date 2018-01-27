import { Router } from 'express'
import articlesController from 'controllers/articles'

const routes = Router()

routes.get('/articles/:category/:page', articlesController.getArticlesByCategory)
routes.get('/articles/:id', articlesController.getArticle)
routes.post('/articles/:id/votes', articlesController.startVotingArticle)
routes.put('/articles/:id/votes', articlesController.voteArticle)

export default routes

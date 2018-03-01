import { Router } from 'express'
import articlesController from 'controllers/articles'

const routes = Router()

routes.get('/articles/:category/:page?', articlesController.getPreviews)
routes.get('/article/:id', articlesController.getArticle)
routes.post('/articles/:id/votes', articlesController.startVotingArticle)
routes.put('/articles/:id/votes', articlesController.voteArticle)

export default routes

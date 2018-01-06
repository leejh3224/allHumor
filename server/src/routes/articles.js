import { Router } from 'express'
import articlesController from 'controllers/articles'

const routes = Router()

routes.get('/articles/dogdrip/:page', articlesController.getArticlesDogdrip)

export default routes

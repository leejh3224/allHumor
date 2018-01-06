import { Router } from 'express'
import crawlersController from 'controllers/crawlers'

const routes = Router()

routes.get('/crawlers/dogdrip/:page', crawlersController.crawlDogdrip)

export default routes

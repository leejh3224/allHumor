import { Router } from 'express'
import crawlersController from 'controllers/crawlers'

const routes = Router()

routes.get('/crawlers/:site/:page', crawlersController.crawlPage)

export default routes

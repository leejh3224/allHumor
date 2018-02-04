import { Router } from 'express'
import crawlersController from 'controllers/crawlers'

const routes = Router()

routes.get('/crawlers/dogdrip/:boardName/:page', crawlersController.crawlDogdrip)
routes.get('/crawlers/kickoff/:page', crawlersController.crawlKickoff)
routes.get('/crawlers/ddengle/:boardName/:page', crawlersController.crawlDdengle)
routes.get('/crawlers/instiz/:page', crawlersController.crawlInstiz)

export default routes

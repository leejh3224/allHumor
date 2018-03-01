import { Router } from 'express'
import crawlers from './crawlers'
import articles from './articles'
import comments from './comments'

const routes = Router()

routes.use('/v1.0', crawlers)
routes.use('/v1.0', articles)
routes.use('/v1.0', comments)

export default routes

import { Router } from 'express'
import users from './users'
import crawlers from './crawlers'
import articles from './articles'

const routes = Router()

routes.use('/v1.0', users)
routes.use('/v1.0', crawlers)
routes.use('/v1.0', articles)

export default routes

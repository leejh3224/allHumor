import { Router } from 'express'
import usersController from 'controllers/users'

const routes = Router()

routes.get('/users', usersController.users)

export default routes

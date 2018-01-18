import jwt from 'jsonwebtoken'
import config from 'config'

const env = process.env.NODE_ENV || 'development'
const { jwtSecret } = config[env]

export default user => jwt.sign(user, jwtSecret)

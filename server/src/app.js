import express from 'express'
import bodyParser from 'body-parser'
import api from 'routes'
import cors from 'cors'
import timeout from 'connect-timeout'
import haltOnTimeout from 'middlewares/haltOnTimeout'
import compression from 'compression'
import helmet from 'helmet'

const app = express()

const notInProduction = process.env.NODE_ENV !== 'production'

app.init = () => {
  if (notInProduction) {
    app.use(cors())
  }
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(timeout(3000))
  app.use(haltOnTimeout)
  app.use(compression())
  app.use(helmet())
  app.use('/api', api)
  // app.use(express.static(path.resolve(`${__dirname}/../../client/build`)))
}

export default app

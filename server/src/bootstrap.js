import path from 'path'

import express from 'express'
import bodyParser from 'body-parser'
import timeout from 'connect-timeout'
import compression from 'compression'
import helmet from 'helmet'

import config from 'config'
import haltOnTimeout from 'middlewares/haltOnTimeout'

export default function bootstrap(app) {
  const env = process.env.NODE_ENV
  const { clientPath = '' } = config[env]

  const common = [
    bodyParser.json(),
    bodyParser.urlencoded({ extended: false }),
    timeout(3000),
    haltOnTimeout,
  ]
  const production = [
    ...common,
    compression(),
    helmet(),
    express.static(path.resolve(__dirname, clientPath)),
  ]

  const middelwares = env === 'developemnt' || env === 'test' ? common : production

  middelwares.forEach(middleware => app.use(middleware))
}

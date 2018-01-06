import express from 'express'
import bodyParser from 'body-parser'
import api from 'routes'
import cors from 'cors'

const app = express()

const notInProduction = process.env.NODE_ENV !== 'production'

app.init = () => {
  if (notInProduction) {
    app.use(cors())
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use('/api', api)
}

export default app

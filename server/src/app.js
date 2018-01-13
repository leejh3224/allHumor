import express from 'express'
import bodyParser from 'body-parser'
import api from 'routes'
import cors from 'cors'
import timeout from 'connect-timeout'
import haltOnTimeout from 'middlewares/haltOnTimeout'
// import ffmpeg from 'fluent-ffmpeg'

const app = express()

const notInProduction = process.env.NODE_ENV !== 'production'

// ffmpeg()
//   .input('./src/__tests__/t.gif')
//   .output('./src/__tests__/t.mp4')

app.init = () => {
  if (notInProduction) {
    app.use(cors())
  }

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(timeout(240000))
  app.use(haltOnTimeout)
  app.use('/api', api)
}

export default app

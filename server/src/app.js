import express from 'express'

import api from 'routes'
import bootstrap from 'bootstrap'

const app = express()

bootstrap(app)

app.use('/api', api)

export default app

import express from 'express'

import api from 'routes'
import bootstrap from 'bootstrap'

const app = express()

app.use('/api', api)
bootstrap(app)

export default app

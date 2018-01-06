import request from 'superagent'
import config from 'config'
import app from 'app'
import db from 'models'

const env = process.env.NODE_ENV
const { port } = config[env]
let server

const rootUrl = `http://localhost:${port}/api/v1.0`

beforeAll(async () => {
  server = app.listen(port, () => console.log(`now connected to port: ${port}`))
  db.connect()
})

afterAll(() => {
  // you can only close listening instance
  server.close()
  db.disconnect()
})

// should return 10 articles of dogdrip type
test('GET /articles/dogdrip/:page', async () => {
  try {
    const z = await request.get(`${rootUrl}/articles/dogdrip/1`)
    console.log(z)
  } catch (error) {
    console.log(error)
  }
})

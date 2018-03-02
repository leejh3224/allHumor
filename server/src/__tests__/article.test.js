import axios from 'axios'
import config from 'config'
import app from 'app'
import db from 'models'

const env = process.env.NODE_ENV
const { port } = config[env]
let server

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
    const { data: articles } = await axios.get('http://124.197.156.97:3031/api/v1.0/articles/humor/1')
    console.log(articles)
  } catch (error) {
    console.log(error)
  }
})

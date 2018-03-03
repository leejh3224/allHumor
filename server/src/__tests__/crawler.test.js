import config from 'config'
import app from 'app'
import crawl from 'utils/crawl'

const env = process.env.NODE_ENV
const { port } = config[env]
let server

beforeAll(async () => {
  server = app.listen(port, () => console.log(`now connected to port: ${port}`))
})

afterAll(() => {
  // you can only close listening instance
  server.close()
})

test('video tag', async () => {
  try {
    const link = 'http://www.dogdrip.net/155765487'
    await crawl(link)
  } catch (error) {
    console.log(error)
  }
})

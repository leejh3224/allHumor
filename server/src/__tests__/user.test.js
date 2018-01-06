import request from 'superagent'
import config from 'config'
import app from 'app'
import db from 'models'
import User from 'models/User'

const env = process.env.NODE_ENV
const { port } = config[env]
let server
let newUser

const rootUrl = `http://localhost:${port}/api/v1.0`

beforeAll(async () => {
  server = app.listen(port, () => console.log(`now connected to port: ${port}`))
  db.connect()
  newUser = new User({ username: 'leejh3224' })
  try {
    const u = await newUser.save()
    console.log(u)
  } catch (error) {
    console.log(error)
  }
})

afterAll(() => {
  // you can only close listening instance
  server.close()
  db.disconnect()
  User.remove({ username: 'leejh3224' }, () => console.log('removed'))
})

test('GET /users', async () => {
  try {
    const res = await request.get(`${rootUrl}/users`)
    console.log(res.body)
  } catch (error) {
    console.log(error)
  }
})

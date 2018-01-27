import config from 'config'
import app from 'app'
import db from 'models'
// import sharp from 'sharp'
// import fs from 'fs'

const env = process.env.NODE_ENV
const { port } = config[env]
let server

beforeAll(async () => {
  server = app.listen(port, () => console.log(`now connected to port: ${port}`))
  app.init()
  db.connect()
})

afterAll(() => {
  // you can only close listening instance
  server.close()
  db.disconnect()
})

// test('image resizing and saving', async () => {
//   const test = fs.readFileSync(`${__dirname}/t.gif`)
//   const image = sharp(test)
//   console.log(`original data size is: ${test.byteLength}`)
//   const meta = await image.metadata()
//   const w = meta.width
//   const h = meta.height

//   if (meta.width > 1000) {
//     // big
//     await image
//       .resize(700, Math.round(h * (700 / w)))
//       .jpeg({ quality: 75 })
//       .toFile(`${__dirname}/t-out.jpeg`)
//   }
// })

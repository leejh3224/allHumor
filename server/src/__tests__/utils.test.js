import config from 'config'
import app from 'app'
import db from 'models'
// import sharp from 'sharp'
// import fs from 'fs'
import nodemailer from 'nodemailer'

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

test('sending email', async () => {
  const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'leejh3224@khu.ac.kr',
      pass: '10rhrnak9027@',
    },
  })

  const mailOptions = {
    from: '이준형 <leejh3224@khu.ac.kr>',
    to: 'leejh3224@naver.com',
    subject: '환영합니다. ALL HUMOR 회원인증 코드입니다.',
    html: `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px;">
        <h1>인증코드는 1234 입니다.</h1>
        <p>계정 생성과 관련된 문제가 발생할 경우 이 메일로 연락해주십시오.</p>
        <p>감사합니다.</p>
        <h1>ALL HUMOR</h1>
      </div>
    `,
  }

  try {
    const response = await smtpTransport.sendMail(mailOptions)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
})

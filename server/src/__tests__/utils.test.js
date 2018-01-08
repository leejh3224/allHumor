import request from 'superagent'
import config from 'config'
import app from 'app'
import db from 'models'
import User from 'models/User'

/* utils */
import fixImageSrc from 'utils/fixImageSrc'
// import getImageName from 'utils/getImageName'
import saveImages from 'utils/saveImages'

const env = process.env.NODE_ENV
const { port } = config[env]
let server

// const rootUrl = `http://localhost:${port}/api/v1.0`

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

// fixImageSrc
test('src의 url을 두 번째 파라미터의 절대경로로 수정해줌', async () => {
  const html = `
    </p><p><br /></p><p>은혜갚은 팀장님</p>
    <p><img src="./dvs/b/i/18/01/08/78/829/367/150/467a435b38d6d23bf0f37e4d33ddebf7.png" alt="Screenshot_20180108-175119.png : 그분들 재봄오빠 찌찌파티 newver." />
  `

  const fixedHtml = fixImageSrc(html, 'http://www.dogdrip.net')

  expect(fixedHtml).toBe(`
    </p><p><br /></p><p>은혜갚은 팀장님</p>
    <p><img src="http://www.dogdrip.net/dvs/b/i/18/01/08/78/829/367/150/467a435b38d6d23bf0f37e4d33ddebf7.png" alt="Screenshot_20180108-175119.png : 그분들 재봄오빠 찌찌파티 newver." />
  `)
})

test('속성 중 data-original이 포함되는 경우(lazy-loading), src의 속성 값과 data-original의 값을 서로 바꿔줌', () => {
  const html = `
    <img src="/addons/lazyload/img/transparent.gif" data-original="http://www.dogdrip.net/dvs/b/i/17/08/05/78/594/358/135/723e9f3120c7bd1910890e489e74d17b.jpg" alt="12.jpg" />
    <p><br /></p>
    <p><img src="./dvs/b/i/17/08/05/78/904/361/135/20b809166e779175146d41d2da73f9d5.JPG" alt="IMG_0896.JPG : 교대 1,2,3학년에게 드리는 충고" />
  `

  const fixedHtml = fixImageSrc(html, 'http://www.dogdrip.net')

  expect(fixedHtml).toBe(`
    <img src="http://www.dogdrip.net/dvs/b/i/17/08/05/78/594/358/135/723e9f3120c7bd1910890e489e74d17b.jpg" data-original="/addons/lazyload/img/transparent.gif" alt="12.jpg" />
    <p><br /></p>
    <p><img src="http://www.dogdrip.net/dvs/b/i/17/08/05/78/904/361/135/20b809166e779175146d41d2da73f9d5.JPG" alt="IMG_0896.JPG : 교대 1,2,3학년에게 드리는 충고" />
  `)
})

test('save', async () => {
  const id = 135275243
  const sources = [
    'http://www.dogdrip.net/dvs/b/i/17/08/04/78/243/275/135/491d4eeee8fb35d9f0cbad967d6fce9c.jpg',
  ]
  const result = await saveImages(sources, id)
  console.log(result)
})

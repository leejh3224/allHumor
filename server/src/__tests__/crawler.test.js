import request from 'superagent'
import cheerio from 'cheerio'
import getArticleData from 'utils/getArticleData'
import config from 'config'
import app from 'app'

const env = process.env.NODE_ENV
const { port } = config[env]
let server

beforeAll(async () => {
  app.init()
  server = app.listen(port, () => console.log(`now connected to port: ${port}`))
})

afterAll(() => {
  // you can only close listening instance
  server.close()
})

test('GET /crawlers/dogdrip/:page', async () => {
  // dogdrip main url은 page만 바꿔주면 됨
  const page = 1
  const dogdripMainUrl = `http://www.dogdrip.net/index.php?mid=dogdrip&page=${page}`

  try {
    const { text } = await request.get(dogdripMainUrl)

    // decodeEntities option 을 false로 설정해야 html() 실행 시 한국어가 제대로 나옴
    // 아래의 옵션은 한국어를 유니코드로 디코딩하기 때문에 생기는 현상
    const $ = await cheerio.load(text, {
      decodeEntities: false,
    })

    const urls = []

    // 공지 부분은 삭제
    $('tbody .notice').remove()

    // 개드립 게시판의 각 링크 주소를 집어넣음
    $('tbody tr .title a').each((i, el) => {
      urls.push(el.attribs.href)
    })

    return await Promise.all(urls.map(async url => getArticleData(url)))
  } catch (error) {
    console.log(error)
  }
})

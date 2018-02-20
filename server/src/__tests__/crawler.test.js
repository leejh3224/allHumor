// import request from 'superagent'
// import cheerio from 'cheerio'
import { URL } from 'url'
import selectLinks from 'utils/selectLinks'
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
  const kickOffUrl = `http://www.kick-off.co.kr/pub/overseas.aspx?pageNum=${page}&condition=I`
  const ddengleUrl = `https://www.ddengle.com/index.php?mid=board_vote_all&page=${page}`
  const instizUrl = `https://www.instiz.net/bbs/list.php?id=fanclip&page=${page}`

  try {
    const links = await selectLinks({
      url: ddengleUrl,
      selector: 'tbody tr .title .bubble',
      selectorsForUnneccessaryNode: [],
    })
    console.log(links)
    return links
  } catch (error) {
    console.log(error)
  }
})

// import request from 'superagent'
// import cheerio from 'cheerio'
import { URL } from 'url'
import config from 'config'
import app from 'app'
import { loadParser, selectLinks, generateArticle } from 'utils/crawler'
import isEmpty from 'lodash/isEmpty'

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

// test('GET /crawlers/dogdrip/:page', async () => {
//   // dogdrip main url은 page만 바꿔주면 됨
//   const page = 1
//   const dogdripMainUrl = `http://www.dogdrip.net/index.php?mid=dogdrip&page=${page}`
//   const kickOffUrl = `http://www.kick-off.co.kr/pub/overseas.aspx?pageNum=${page}&condition=I`
//   const ddengleUrl = `https://www.ddengle.com/index.php?mid=board_vote_all&page=${page}`
//   const instizUrl = `https://www.instiz.net/bbs/list.php?id=fanclip&page=${page}`

//   try {
//     const links = await selectLinks({
//       url: ddengleUrl,
//       selector: 'tbody tr .title .bubble',
//       selectorsForUnneccessaryNode: [],
//     })
//     const parser = await loadParser(dogdripMainUrl)
//     return links
//   } catch (error) {
//     console.log(error)
//   }
// })

test('generateArticle', async () => {
  try {
    const dogdripArticle = await generateArticle({
      url: 'http://www.dogdrip.net/154910945',
      authorSelector: '.author span',
      contentSelector: '.xe_content [style="text-align: center;"]',
      titleSelector: '.titleAndUser .title h1 a',
      uploadDateSelector: '.dateAndCount .date',
    })
    const kickoffArticle = await generateArticle({
      url:
        'http://www.kick-off.co.kr/pub/overseas.aspx?mode=view&postNum=98382&pageNum=1&searchType=&searchText=&condition=I',
      authorSelector: '.view_regist_info_regist_user a[onclick^="$.userInfoMenu"]',
      contentSelector: '.view_contents',
      titleSelector: '.view_title',
      uploadDateSelector: '.view_regist_info_regist_date',
    })
    const ddengleArticle = await generateArticle({
      url: 'https://www.ddengle.com/board_vote_all/6214561',
      authorSelector: '.btm_area .nick',
      contentSelector: '.xe_content',
      titleSelector: '.np_18px a',
      uploadDateSelector: '.fr .date',
    })
    const instizArticle = await generateArticle({
      url: 'https://www.instiz.net/fanclip?no=462207&page=1',
      authorSelector: '.tb_left span a',
      contentSelector: '.memo_content',
      titleSelector: '.tb_top #subject a',
      uploadDateSelector:
        '[itemtype="http://schema.org/Article"] .tb_left span[itemprop=datePublished]',
    })
    console.log(instizArticle)
  } catch (error) {
    console.log(error)
  }
})

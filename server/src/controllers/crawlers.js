import axios from 'axios'
import cheerio from 'cheerio'
import Article from 'models/Article'
import parseRawHtml from 'utils/parseRawHtml'
import removeDuplicate from 'utils/removeDuplicate'

export default {
  crawlDogdrip: async (req, res) => {
    const { boardName = 'dogdrip', page = 1 } = req.params
    const dogdripUrl = `http://www.dogdrip.net/index.php?mid=${boardName}&page=${page}`

    try {
      const { data } = await axios.get(dogdripUrl)

      // decodeEntities option 을 false로 설정해야 html() 실행 시 한국어가 제대로 나옴
      // 아래의 옵션은 한국어를 유니코드로 디코딩하기 때문에 생기는 현상
      const $ = await cheerio.load(data, {
        decodeEntities: false,
      })

      const urls = []

      // 공지 부분은 삭제
      $('tbody .notice').remove()

      // 개드립 게시판의 각 링크 주소
      $('tbody tr .title a').each((i, el) => {
        urls.push(el.attribs.href)
      })

      const withoutDuplicate = await removeDuplicate(urls, 'dogdrip')
      const articles = await Promise.all(withoutDuplicate.map(url => parseRawHtml(url)))
      const truthy = articles.filter(article => article)

      await Article.insertMany(truthy)

      console.log('articles saved!')
      res.json({
        articles,
      })
    } catch (error) {
      console.log(88888, error)
      return res.json({
        error,
      })
    }
  },
}

import axios from 'axios'
import cheerio from 'cheerio'
import getArticleData from 'utils/getArticleData'
import Article from 'models/Article'

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

      // 개드립 게시판의 각 링크 주소를 집어넣음
      $('tbody tr .title a').each((i, el) => {
        urls.push(el.attribs.href)
      })

      const articlesData = await Promise.all(urls.map(url => getArticleData(url, 'http://www.dogdrip.net')))

      await Promise.all(articlesData.map(async (article) => {
        if (article) {
          try {
            await new Article(article).save()
          } catch (error) {
            console.log(error)
          }
        }
      }))

      res.json({
        articles: articlesData,
      })
    } catch (error) {
      console.log(88888, error)
      return res.json({
        error,
      })
    }
  },
}

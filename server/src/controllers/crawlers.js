import axios from 'axios'
import cheerio from 'cheerio'
import getArticles from 'utils/getArticles'
import Article from 'models/Article'
import extractArticle from 'utils/extractArticle'

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

      const [fromDB] = await Article.aggregate([
        {
          $match: { site: 'dogdrip' },
        },
        {
          $group: { _id: null, articleIds: { $push: '$articleId' } },
        },
        {
          $project: { _id: 0, articleIds: 1 },
        },
      ])

      const urlsWithoutDuplicate = urls
        .map((url) => {
          const getArticleId = str => str.replace(/[http|https]{1,}:\/\/www.[\w.]{1,}\//, '')
          const hasCrawled = fromDB.articleIds.includes(getArticleId(url))

          if (hasCrawled) {
            return null
          }

          return url
        })
        .filter(url => url)

      let articles = await Promise.all(urlsWithoutDuplicate.map(url => extractArticle(url)))
      articles = await Promise.all(articles.map(rawData => getArticles(rawData, 'http://www.dogdrip.net')))
      articles = articles.filter(article => article) // get truthy value
      await Article.insertMany(articles)

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

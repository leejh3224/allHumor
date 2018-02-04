import axios from 'axios'
import cheerio from 'cheerio'
import Article from 'models/Article'
import parseRawHtml from 'utils/parseRawHtml'
import removeDuplicate from 'utils/removeDuplicate'

export default {
  crawlDogdrip: async (req, res) => {
    const { boardName = 'dogdrip', page = 1 } = req.params
    const dogdripUrl = `http://www.dogdrip.net/index.php?mid=${boardName}&page=${page}`
    const siteName = 'dogdrip'

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

      const withoutDuplicate = await removeDuplicate(urls, siteName)
      const articles = await Promise.all(withoutDuplicate.map(url => parseRawHtml(url, siteName)))
      const truthy = articles.filter(article => article)

      await Article.insertMany(truthy)

      console.log('articles saved!')
      res.json({
        articles: truthy,
      })
    } catch (error) {
      console.log(88888, error)
      res.json({
        error,
      })
    }
  },
  crawlKickoff: async (req, res) => {
    // pub-해외축구
    const { page = 1 } = req.params
    // condition I = 이미지 게시글
    const kickoffUrl = `http://www.kick-off.co.kr/pub/overseas.aspx?pageNum=${page}&condition=I`
    const siteName = req.url.match(/^\/crawlers\/(\w{0,})/)[1]

    try {
      const { data } = await axios.get(kickoffUrl)

      // decodeEntities option 을 false로 설정해야 html() 실행 시 한국어가 제대로 나옴
      // 아래의 옵션은 한국어를 유니코드로 디코딩하기 때문에 생기는 현상
      const $ = await cheerio.load(data, {
        decodeEntities: false,
      })

      const urls = []

      $('tbody tr .list_title a').each((i, el) => {
        urls.push(`http://www.kick-off.co.kr${el.attribs.href}`)
      })

      const withoutDuplicate = await removeDuplicate(urls, siteName)
      const articles = await Promise.all(withoutDuplicate.map(url => parseRawHtml(url, siteName)))
      const truthy = articles.filter(article => article)

      await Article.insertMany(truthy)

      res.json({
        articles: truthy,
      })
    } catch (error) {
      console.log(error)
      res.json({
        error,
      })
    }
  },
  crawlDdengle: async (req, res) => {
    const { boardName = 'board_vote_all', page = 1 } = req.params
    const ddengleUrl = `https://www.ddengle.com/index.php?mid=${boardName}&page=${page}`
    const siteName = 'ddengle'

    try {
      const { data } = await axios.get(ddengleUrl)

      // decodeEntities option 을 false로 설정해야 html() 실행 시 한국어가 제대로 나옴
      // 아래의 옵션은 한국어를 유니코드로 디코딩하기 때문에 생기는 현상
      const $ = await cheerio.load(data, {
        decodeEntities: false,
      })

      const urls = []

      $('tbody tr .title .bubble').each((i, el) => {
        urls.push(el.attribs.href)
      })

      const withoutDuplicate = await removeDuplicate(urls, siteName)
      const articles = await Promise.all(withoutDuplicate.map(url => parseRawHtml(url, siteName)))
      const truthy = articles.filter(article => article)

      await Article.insertMany(truthy)

      res.json({
        articles: truthy,
      })
    } catch (error) {
      console.log(error)
      res.json({
        error,
      })
    }
  },
  crawlInstiz: async (req, res) => {
    const { page = 1 } = req.params
    // 인스티즤 예인영상 게시판
    const instizUrl = `https://www.instiz.net/bbs/list.php?id=fanclip&page=${page}`
    const siteName = 'instiz'

    try {
      const { data } = await axios.get(instizUrl)

      // decodeEntities option 을 false로 설정해야 html() 실행 시 한국어가 제대로 나옴
      // 아래의 옵션은 한국어를 유니코드로 디코딩하기 때문에 생기는 현상
      const $ = await cheerio.load(data, {
        decodeEntities: false,
      })

      const urls = []

      // 필요없는 부분은 삭제
      $('tbody #topboard').remove()

      $('tbody tr #subject a').each((i, el) => {
        urls.push(`https://www.instiz.net${el.attribs.href.replace(/../, '')}`)
      })

      const withoutDuplicate = await removeDuplicate(urls, siteName)
      const articles = await Promise.all(withoutDuplicate.map(url => parseRawHtml(url, siteName)))
      const truthy = articles.filter(article => article)

      await Article.insertMany(truthy)

      res.json({
        articles: truthy,
      })
    } catch (error) {
      console.log(error)
      res.json({
        error,
      })
    }
  },
}

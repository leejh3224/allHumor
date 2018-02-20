import Article from 'models/Article'
import parseRawHtml from 'utils/parseRawHtml'
import filterDuplicateLinks from 'utils/filterDuplicateLinks'
import selectLinks from 'utils/selectLinks'

export default {
  crawlDogdrip: async (req, res) => {
    const { page = 1 } = req.params
    const dogdripUrl = `http://www.dogdrip.net/index.php?mid=dogdrip&page=${page}`

    try {
      const links = await selectLinks({
        url: dogdripUrl,
        selector: 'tbody tr .title a',
        selectorsForUnneccessaryNode: ['tbody .notice'],
      })
      const filteredLinks = await filterDuplicateLinks(links)
      const articles = await Promise.all(filteredLinks.map(link => parseRawHtml(link)))
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

    try {
      const links = await selectLinks({
        url: kickoffUrl,
        selector: 'tbody tr .list_title a',
        selectorsForUnneccessaryNode: [],
      })
      const filteredLinks = await filterDuplicateLinks(links)
      const articles = await Promise.all(filteredLinks.map(link => parseRawHtml(link)))
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
    const { page = 1 } = req.params
    const ddengleUrl = `https://www.ddengle.com/index.php?mid=board_vote_all&page=${page}`

    try {
      const links = await selectLinks({
        url: ddengleUrl,
        selector: 'tbody tr .title .bubble',
        selectorsForUnneccessaryNode: [],
      })
      const filteredLinks = await filterDuplicateLinks(links)
      const articles = await Promise.all(filteredLinks.map(link => parseRawHtml(link)))
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

    try {
      const links = await selectLinks({
        url: instizUrl,
        selector: 'tbody tr #subject a',
        selectorsForUnneccessaryNode: ['tbody #topboard', 'tbody tr #subject .texthead'],
      })
      const filteredLinks = await filterDuplicateLinks(links)
      const articles = await Promise.all(filteredLinks.map(link => parseRawHtml(link)))
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

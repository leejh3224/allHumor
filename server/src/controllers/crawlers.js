import Article from 'models/Article'
import checkExistence from 'utils/checkExistence'
import selectLinks from 'utils/selectLinks'
import crawl from 'utils/crawl'

export default {
  crawlPage: async (req, res) => {
    const { page = 1, site } = req.params
    const url = {
      dogdrip: `http://www.dogdrip.net/index.php?mid=dogdrip&page=${page}`,
      kickoff: `http://www.kick-off.co.kr/pub/overseas.aspx?pageNum=${page}&condition=I`,
      ddengle: `https://www.ddengle.com/index.php?mid=board_vote_all&page=${page}`,
      instiz: `https://www.instiz.net/bbs/list.php?id=fanclip&page=${page}`,
    }[site]
    const hrefSelector = {
      dogdrip: 'tbody tr .title a',
      kickoff: 'tbody tr .list_title a',
      ddengle: 'tbody tr .title .bubble',
      instiz: 'tbody tr #subject a',
    }[site]
    const selectorsForUnneccessaryNode = {
      dogdrip: ['tbody .notice'],
      kickoff: [],
      ddengle: [],
      instiz: ['tbody #topboard', 'tbody tr #subject .texthead'],
    }[site]

    function filterLinks(list) {
      return list.map(async (link) => {
        const exists = await checkExistence(link)
        return !exists ? link : null
      })
    }

    try {
      const links = await selectLinks({
        url,
        selector: hrefSelector,
        selectorsForUnneccessaryNode,
      })

      // filter promises are not supported
      // so map first then filter instead
      // https://stackoverflow.com/questions/33355528/filtering-an-array-with-a-function-that-returns-a-promise
      const filteredLinks = (await Promise.all(filterLinks(links))).filter(truthy => truthy)

      let articles = []

      if (filteredLinks.length) {
        articles = (await Promise.all(filteredLinks.map(crawl))).filter(article => article)
        await Article.insertMany(articles)
      }

      res.json({
        articles,
      })
    } catch (error) {
      console.log(error)
      res.json({
        error,
      })
    }
  },
}

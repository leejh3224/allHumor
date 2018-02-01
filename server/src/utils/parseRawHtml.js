import cheerio from 'cheerio'
import axios from 'axios'
import sanitizeHtml from 'utils/sanitizeHtml'
import parseMediaTags from 'utils/parseMediaTags'

export default async (url) => {
  try {
    const { data } = await axios.get(url)
    const $ = cheerio.load(data, {
      decodeEntities: false,
    })

    if (url.includes('dogdrip')) {
      const articleId = url.replace(/[http|https]{1,}:\/\/www.[\w.]{1,}\//, '')
      const author = $('.author span').text()

      // 본문에서 필요 없는 부분은 삭제
      $('.document_popup_menu').remove()
      $('addon_addvote').remove()
      let content = $('.contentBody .xe_content').html()
      const date = $('.dateAndCount .date')
        .text()
        .trim()
      const site = 'dogdrip'
      const title = $('.titleAndUser .title h1 a').text()
      const domain = 'http://www.dogdrip.net'

      // 1. dogdrip uses lazyload feature
      // therefore imgs hold original src data in attribute called 'data-original'
      // so src value and data-original value should be exchanged
      // 2. 상대경로인 경우와 절대경로이지만 개드립 url이 누락된 경우 모두를 커버하기 위해
      // 그리고 iframe의 src는 not match
      // ex) case1: src="dvs/b/i/18 ..." / case2: src="./dvs/b/i/18 ..."
      // 3. 개드립 예전 src url
      content = sanitizeHtml(content)
        .replace(
          /(src=")(\/addons\/lazyload\/img\/transparent.gif)"\s(data-original=")([http:|https:|.]{1,}[\w/.]{0,})"/g,
          '$1$4" $3$2"',
        )
        .replace(/src="(?!https:\/\/www.youtube.com)[.]?\/?dvs/g, (matched) => {
          if (matched.includes('dvs')) {
            return `src="${domain}/dvs`
          }
          return `src="${domain}`
        })
        .replace(/"\/files\/attach/g, `"${domain}/files/attach`)

      const [thumbnail, parsedContent] = await parseMediaTags(content, site, articleId)

      console.log(articleId)

      if (parsedContent) {
        return {
          articleId,
          author,
          content: parsedContent,
          thumbnail,
          site,
          title,
          uploadDate: new Date(date),
          comments: [],
          votes: [],
        }
      }

      return null
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

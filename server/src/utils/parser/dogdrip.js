import sanitizeHtml from 'utils/sanitizeHtml'
import parseMediaTags from 'utils/parseMediaTags'
import getCategoryBySite from 'utils/getCategoryBySite'

export default async (url, $) => {
  const articleId = url.replace(/[http|https]{1,}:\/\/www.[\w.]{1,}\//, '')
  const site = 'dogdrip'
  const domain = 'http://www.dogdrip.net'
  const author = $('.author span').text()

  // 본문에서 필요 없는 부분은 삭제
  $('.document_popup_menu').remove()
  $('addon_addvote').remove()
  let content = $('.contentBody .xe_content').html()
  const date = $('.dateAndCount .date')
    .text()
    .trim()
  const title = $('.titleAndUser .title h1 a').text()

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

  if (parsedContent) {
    return {
      articleId,
      author,
      content: parsedContent,
      thumbnail,
      category: getCategoryBySite(site),
      site,
      title,
      uploadDate: new Date(date),
      comments: [],
      votes: [],
    }
  }
  return null
}

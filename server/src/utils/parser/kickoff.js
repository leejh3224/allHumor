import sanitizeHtml from 'utils/sanitizeHtml'
import parseMediaTags from 'utils/parseMediaTags'
import getCategoryBySite from 'utils/getCategoryBySite'

export default async (url, $) => {
  const articleId = /(postNum=)(\d{0,})/.exec(url)[2]
  const site = 'kickoff'
  const domain = 'http://www.kick-off.co.kr'
  const author = $('.view_regist_info_regist_user')
    .children()
    .last()
    .text()
  let content = $('.view_contents').html()
  const date = $('.view_regist_info_regist_date').text()
  const title = $('.view_title').text()
  content = sanitizeHtml(content).replace(/src="\/uploadImage/g, `src="${domain}/uploadImage`)

  // fmkorea에서 가져온 이미지는 다운로드가 정상적으로 이뤄지지 않음
  if (content.includes('.fmkorea.')) {
    return null
  }

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

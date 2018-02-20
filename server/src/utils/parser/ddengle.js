import sanitizeHtml from 'utils/sanitizeHtml'
import parseMediaTags from 'utils/parseMediaTags'
import getCategoryBySite from 'utils/getCategoryBySite'

export default async (url, $) => {
  const articleId = url.match(/\d+$/)[0]
  const site = 'ddengle'
  const author = $('.btm_area .nick').text()
  let content = $('.xe_content').html()
  const date = $('.fr .date').text()
  const title = $('.np_18px a').text()
  const domain = 'https://www.ddengle.com'

  content = sanitizeHtml(content).replace(/"\/files\/attach/g, `"${domain}/files/attach`)

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

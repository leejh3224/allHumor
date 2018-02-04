import sanitizeHtml from 'utils/sanitizeHtml'
import parseMediaTags from 'utils/parseMediaTags'

export default async (url, $) => {
  const articleId = url.match(/\d+$/)[0]
  const site = 'ddengle'
  const author = $('.btm_area .nick').text()
  let content = $('.xe_content').html()
  const date = $('.fr .date').text()
  const title = $('.np_18px a').text()

  content = sanitizeHtml(content)

  const [thumbnail, parsedContent] = await parseMediaTags(content, site, articleId)

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

import { sanitizeHtml } from 'utils/crawler'
import parseMediaTags from 'utils/parseMediaTags'
import getCategoryBySite from 'utils/getCategoryBySite'

export default async (url, $) => {
  const articleId = url.match(/\d+(?=&page)/)[0]
  const site = 'instiz'
  const author = $('.tb_left span a').text()
  let content = $('.memo_content').html()
  const date = $('.tb_left span[itemprop=datePublished]').attr('title')
  const title = $('.tb_top #subject a').text()
  content = sanitizeHtml(content)

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
      originalLink: url,
    }
  }
  return null
}

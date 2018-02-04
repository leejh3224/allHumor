import sanitizeHtml from 'utils/sanitizeHtml'
import parseMediaTags from 'utils/parseMediaTags'

export default async (url, $) => {
  const articleId = url.match(/\d+(?=&page)/)[0]
  const site = 'instiz'
  const author = $('.tb_left span a').text()
  let content = $('.memo_content').html()
  const date = $('.tb_left span')
    .eq(2)
    .text()
    .match(/\d{4}.\d{1,2}.\d{1,2}\s\d{1,}:\d{1,2}/)[0]
  const title = $('.tb_top #subject a').text()
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

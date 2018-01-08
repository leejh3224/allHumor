import cheerio from 'cheerio'
import request from 'superagent'

export default async (url) => {
  try {
    const article = await request.get(url)
    const $ = cheerio.load(article.text, {
      decodeEntities: false,
    })

    if (url.includes('dogdrip')) {
      const articleId = url.replace(/[http|https]{1,}:\/\/www.[\w.]{1,}\//, '')
      const author = $('.author span').text()

      // 본문에서 필요 없는 부분은 삭제
      $('.document_popup_menu').remove()
      $('addon_addvote').remove()
      const content = $('.contentBody .xe_content').html()
      const date = $('.dateAndCount .date')
        .text()
        .trim()
      const site = 'dogdrip'
      const title = $('.titleAndUser .title h1 a').text()

      return {
        articleId,
        author,
        content,
        site,
        title,
        uploadDate: new Date(date),
      }
    }
  } catch (error) {
    console.log(error)
  }
}

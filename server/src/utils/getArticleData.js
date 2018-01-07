import cheerio from 'cheerio'
import request from 'superagent'
import fixImageSrc from 'utils/fixImageSrc'
import sanitizeHtml from 'utils/sanitizeHtml'
import convertToJsx from 'utils/convertToJsx'
import saveArticleImagesById from 'utils/saveArticleImagesById'
import domainShortNames from 'utils/domainShortNames'
import getImageName from 'utils/getImageName'
import adjustImageSrc from 'utils/adjustImageSrc'

export default async (url, domain) => {
  try {
    const article = await request.get(url)
    const $ = cheerio.load(article.text, {
      decodeEntities: false,
    })

    const title = $('.titleAndUser .title h1 a').text()
    const author = $('.author span').text()
    const date = $('.dateAndCount .date')
      .text()
      .trim()

    // 본문에서 필요 없는 부분은 삭제
    $('.document_popup_menu').remove()
    $('addon_addvote').remove()
    let htmlContent = $('.contentBody .xe_content').html()

    const id = url.replace(/[http|https]{1,}:\/\/www.[\w.]{1,}\//, '')

    htmlContent = sanitizeHtml(htmlContent)
    htmlContent = fixImageSrc(htmlContent, domain)
    htmlContent = convertToJsx(htmlContent)

    // matches img src tag
    // and convert it to url
    const sources = htmlContent
      .match(/<img src="[http:|https:]{1,}[/\w?.=:]{0,}/g)
      .map(matched => matched.replace(/<img src="/, ''))

    if (sources && sources.length) {
      saveArticleImagesById(sources, id)
      htmlContent = adjustImageSrc(htmlContent, domainShortNames[domain], id)
    }

    return {
      _id: id,
      uploadDate: new Date(date),
      title,
      author,
      thumbnail:
        sources && sources.length
          ? `images/${domainShortNames[domain]}/${id}_${getImageName(sources[0])}`
          : null,
      content: htmlContent,
      type: domainShortNames[domain],
    }
  } catch (error) {
    console.log(12111, error)

    return null
  }
}

import sanitizeHtml from 'utils/sanitizeHtml'
import convertToJsx from 'utils/convertToJsx'
import saveImages from 'utils/saveImages'
import getImageName from 'utils/getImageName'
import extractArticle from 'utils/extractArticle'
import pipe from 'utils/pipe'
import Article from 'models/Article'

export default async (url, domain) => {
  try {
    const extracted = await extractArticle(url)
    const { articleId, site, ...rest } = extracted
    let { content } = extracted
    let thumbnail = null

    // 개선점:
    // 이미지 압축할것
    content = pipe(
      c => sanitizeHtml(c),
      (c) => {
        if (site === 'dogdrip') {
          // dogdrip uses lazyload feature
          // therefore imgs hold original src data in attribute called 'data-original'
          // so src value and data-original value should be exchanged
          return c.replace(
            /(src=")(\/addons\/lazyload\/img\/transparent.gif)"\s(data-original=")([http:|https:|.]{1,}[\w/.]{0,})"/g,
            '$1$4" $3$2"',
          )
        }
        return c
      },
      // converts relative path to absolute path
      c => c.replace(/src="[.]/g, `src="${domain}`),
      (c) => {
        const imgSrcRegex = /(<img src=")([http:|https:]{1,}[/\w?.=:]{0,})/
        const imgSrcRegexGlobal = new RegExp(imgSrcRegex, 'g')
        const urls = []

        if (c.match(imgSrcRegex)) {
          // from full img tags, get url only
          c.match(imgSrcRegexGlobal).forEach(src => urls.push(imgSrcRegex.exec(src)[2]))
        }

        if (urls.length) {
          saveImages(urls, articleId)

          const firstImageName = getImageName(urls[0])
          thumbnail = `images/${site}/${articleId}_${firstImageName}`

          // after saving images
          // adjust image src to match public url
          // e.g. images/example_site/articleId_imageName
          return c.replace(
            imgSrcRegex,
            matched => `<img src="images/${site}/${articleId}_${getImageName(matched)}`,
          )
        }
        return c
      },
      c => convertToJsx(c),
    )(content)

    const article = {
      articleId,
      thumbnail,
      content,
      site,
      ...rest,
    }

    const isNotSaved =
      (await Article.find({
        site: article.site,
        articleId: article.articleId,
      }).count()) === 0

    if (isNotSaved) {
      await new Article(article).save()
    }

    return article
  } catch (error) {
    console.log(12111, error)

    return null
  }
}

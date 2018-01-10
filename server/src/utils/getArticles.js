import sanitizeHtml from 'utils/sanitizeHtml'
import convertToJsx from 'utils/convertToJsx'
import saveImages from 'utils/saveImages'
import getImageName from 'utils/getImageName'
import pipe from 'utils/pipe'
import extractArticle from 'utils/extractArticle'
import Article from 'models/Article'

export default async (url, domain) => {
  const data = await extractArticle(url)

  if (data) {
    const { articleId, site, ...rest } = data
    let { content } = data

    try {
      let thumbnail = null

      content = await pipe(
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
        c => c.replace(/src="[.]/g, `src="${domain}`), // converts relative path to absolute path
        c => convertToJsx(c),
        async (c) => {
          const imgSrcRegex = /(<img src=")([http:|https:]{1,}[/\w?.=:]{0,})/
          const imgSrcRegexGlobal = new RegExp(imgSrcRegex, 'g')
          const hasImages = imgSrcRegex.test(c)
          const urls = []

          if (hasImages) {
            // from list of img tags, get url only
            c.match(imgSrcRegexGlobal).forEach(src => urls.push(imgSrcRegex.exec(src)[2]))

            const [firstImage] = await saveImages(urls, site, articleId)
            thumbnail = firstImage

            // 프론트에서 보여주기 쉬운 형태로 src 태그 변환
            // e.g. images/example_site/articleId_imageName
            return c.replace(
              imgSrcRegex,
              matched => `<img src="images/${site}/${articleId}_${getImageName(matched)}`,
            )
          }

          return c
        },
      )(content)

      const article = {
        articleId,
        thumbnail,
        content,
        site,
        ...rest,
      }

      await new Article(article).save()
      console.log(articleId)
      return article
    } catch (error) {
      console.log(12111, error)

      return null
    }
  }
}

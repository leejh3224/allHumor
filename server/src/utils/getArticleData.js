import sanitizeHtml from 'utils/sanitizeHtml'
import convertToJsx from 'utils/convertToJsx'
import saveImages from 'utils/saveImages'
import getImageName from 'utils/getImageName'
import formatSrc from 'utils/formatSrc'
import extractArticle from 'utils/extractArticle'
import compose from 'utils/compose'
import Article from 'models/Article'

export default async (url, domain) => {
  try {
    const extracted = await extractArticle(url)
    const {
      articleId, content, site, ...rest
    } = extracted
    let thumbnail = null

    /* helpers */
    const getImgTags = html => html.match(/<img src="[http:|https:]{1,}[/\w?.=:]{0,}/g)
    const getImgUrl = tagsArray => tagsArray.map(tags => tags.replace(/<img src="/, ''))
    const fixImageSrc = (html, rightPath) => {
      // 개드립 기준
      // 간혹 src가 절대경로가 아니라 상대경로로 되어있는 경우가 있음
      // 이 경우 절대경로로 수정해줌
      // 또 lazyload 기능을 사용하기 때문에 src를 data-original에 있는 경로로
      // 바꾸어줘야 제대로 파일을 저장할 수 있음
      const fixedLazyLoadSrc = html.replace(
        /(src=")(\/addons\/lazyload\/img\/transparent.gif)"\s(data-original=")([http:|https:|.]{1,}[\w/.]{0,})"/g,
        '$1$4" $3$2"',
      )
      const haveRelativeSrc = fixedLazyLoadSrc.match(/(src="[.])/g)

      if (haveRelativeSrc) {
        return fixedLazyLoadSrc.replace(/(src="[.])/g, `src="${rightPath}`)
      }
      return fixedLazyLoadSrc
    }

    const jsx = compose(
      c => sanitizeHtml(c),
      c => (site === 'dogdrip' ? fixImageSrc(c, domain) : c),
      c => convertToJsx(c),
      c => (getImgTags(c) ? { tags: getImgTags(c), html: c } : c),
      (c) => {
        if (c.tags) {
          // remove unnecessary
          const urls = getImgUrl(c.tags)
          const firstImageName = getImageName(urls[0])
          saveImages(urls, articleId)
          thumbnail = `images/${site}/${articleId}_${firstImageName}`
          return formatSrc(c.html, site, articleId)
        }
        return c
      },
    )(content)

    const article = {
      articleId,
      thumbnail,
      content: jsx,
      site,
      ...rest,
    }

    await new Article(article).save()

    return article
  } catch (error) {
    console.log(12111, error)

    return null
  }
}

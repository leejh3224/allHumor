import sanitizeHtml from 'utils/sanitizeHtml'
import saveImages from 'utils/saveImages'
import getImageName from 'utils/getImageName'

export default async (rawData, domain) => {
  if (!rawData) {
    return null
  }

  const { articleId, site, ...rest } = rawData
  let { content } = rawData

  let thumbnail = null

  content = sanitizeHtml(content)

  if (site === 'dogdrip') {
    // dogdrip uses lazyload feature
    // therefore imgs hold original src data in attribute called 'data-original'
    // so src value and data-original value should be exchanged
    content = content.replace(
      /(src=")(\/addons\/lazyload\/img\/transparent.gif)"\s(data-original=")([http:|https:|.]{1,}[\w/.]{0,})"/g,
      '$1$4" $3$2"',
    )

    content = content.replace(/src="[.]/g, `src="${domain}`) // converts relative path to absolute path
    content = content.replace(/"\/files\/attach/g, `"${domain}/files/attach`) // 개드립 예전 src url
  }

  const imgSrcRegex = /(<img src=")([http:|https:]{1,}[/\w?.=:]{0,})/
  const imgSrcRegexGlobal = new RegExp(imgSrcRegex, 'g')
  const hasImages = imgSrcRegex.test(content)
  const urls = []

  if (hasImages) {
    // from list of img tags, get url only
    content.match(imgSrcRegexGlobal).forEach(src => urls.push(imgSrcRegex.exec(src)[2]))

    if (urls.length > 3) {
      return null // for the sake of response speed
    }

    const [firstImage] = await saveImages(urls, site, articleId)
    thumbnail = firstImage

    // 프론트에서 보여주기 쉬운 형태로 src 태그 변환
    // e.g. images/example_site/articleId_imageName
    content = content.replace(
      imgSrcRegexGlobal,
      matched =>
        `<img src="images/${site}/${articleId}_${getImageName(matched)}" style="max-width: 100%;"`,
    )
  }

  console.log(articleId)

  return {
    ...rest, // overwrite를 하려면 overwrite 되기 전의 데이터부터 넣어야됨
    articleId,
    site,
    content, // 제대로 된 jsx 로 overwrite
    thumbnail,
    comments: [],
    upvotedUsers: [],
  }
}

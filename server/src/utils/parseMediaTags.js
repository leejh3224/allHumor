import saveImages from 'utils/saveImages'
import getImageName from 'utils/getImageName'

const parseMediaTags = async (content, site, articleId) => {
  let thumbnail = null
  let parsedContent = null

  const imgSrcRegex = /(<img src=")([http:|https:]{1,}[/\w?.=:]{0,})/
  const videoSrcRegex = /<iframe/
  const imgSrcRegexGlobal = new RegExp(imgSrcRegex, 'g')
  const hasImages = imgSrcRegex.test(content)
  const hasVideos = videoSrcRegex.test(content)
  const urls = []

  if (hasVideos) {
    thumbnail = 'video'
  }

  if (hasImages) {
    // from list of img tags, get url only
    content.match(imgSrcRegexGlobal).forEach(src => urls.push(imgSrcRegex.exec(src)[2]))

    if (urls.length > 2) {
      return [thumbnail, parsedContent] // for the sake of response speed
    }

    const [firstImage] = await saveImages(urls, site, articleId)
    thumbnail = firstImage

    // 프론트에서 보여주기 쉬운 형태로 src 태그 변환
    // e.g. images/example_site/articleId_imageName
    parsedContent = content.replace(
      imgSrcRegexGlobal,
      matched =>
        `<img src="images/${site}/${articleId}_${getImageName(matched)}" style="max-width: 100%;"`,
    )
  }

  return [thumbnail, parsedContent || content]
}

export default parseMediaTags

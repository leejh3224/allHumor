import saveImages from 'utils/saveImages'
import getImageName from 'utils/getImageName'

const parseMediaTags = async (content, site, articleId) => {
  let thumbnail = null
  let parsedContent = null

  const imgSrcRegex = /(<img.*?src=")(https?:\/\/[/\w-\s_.가-힇()@[\]:=?]+)/
  const videoSrcRegex = /<iframe/
  const imgSrcRegexGlobal = new RegExp(imgSrcRegex, 'g')
  const hasImages = imgSrcRegex.test(content)
  const hasVideos = videoSrcRegex.test(content)
  const urls = []

  if (hasImages) {
    // from list of img tags, get url only
    content.match(imgSrcRegexGlobal).forEach((src) => {
      if (/[가-힇\s]+/.test(src)) {
        const encoded = encodeURI(imgSrcRegex.exec(src)[2])
        return urls.push(encoded)
      }
      return urls.push(imgSrcRegex.exec(src)[2])
    })

    if (urls.length >= 3) {
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

  if (hasVideos) {
    thumbnail = 'video'
  }

  return [thumbnail, parsedContent || content]
}

export default parseMediaTags

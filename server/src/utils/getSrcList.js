import { URL } from 'url'

import loadParser from 'utils/loadParser'
import normalizeUrl from 'normalize-url'
import checkRelativePath from 'utils/common/checkRelativePath'
import getSelctorsForArticle from 'utils/getSelectorsForArticle'

function isValidImg(img) {
  return img.attr('src')
}

function checkLazyLoad(url) {
  return url.includes('/addons/lazyload') || url.includes('/classes/lazy')
}

function checkUnsafeCharacters(url) {
  return /가-힇\s/g.test(url)
}

export default async function (url) {
  try {
    const parser = await loadParser(url)
    const { bodySelector } = getSelctorsForArticle(url)

    const imagesInBodySelector = `${bodySelector} img`

    const listOfSrc = parser.getNodesList(imagesInBodySelector).filter(isValidImg)

    const tooManyIamges = listOfSrc.length > 2

    if (tooManyIamges) {
      return []
    }

    return (
      listOfSrc
        .map((imgElement) => {
          const src = imgElement.attr('src')
          const { origin } = new URL(url)

          if (checkRelativePath(src)) {
            return src.replace(/[.]{0,2}\//, `${origin}/`)
          }
          if (checkLazyLoad(src)) {
            return imgElement.attr('data-original')
          }
          return src
        })
        .map((src) => {
          if (checkUnsafeCharacters(src)) {
            return encodeURI(src)
          }
          return src
        })
        // INFO
        // 땡글의 이미지 요청 url에서 www가 없어지면 Max Redirects Exceeded 에러가 발생함
        .map(src => normalizeUrl(src, { stripWWW: false }))
    )
  } catch (error) {
    console.log(error)
    return []
  }
}

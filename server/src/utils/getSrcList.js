import { URL } from 'url'

import normalizeUrl from 'normalize-url'
import checkRelativePath from 'utils/common/checkRelativePath'

function isValidImg(img) {
  return img.attr('src')
}

function checkLazyLoad(url) {
  return url.includes('/addons/lazyload') || url.includes('/classes/lazy')
}

function checkUnsafeCharacters(url) {
  return /[가-힇\s]+/g.test(url)
}

export default ({ url, images }) =>
  images
    .filter(isValidImg)
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

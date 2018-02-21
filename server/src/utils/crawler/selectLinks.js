import { URL } from 'url'

import { loadParser } from 'utils/crawler'

function checkOrigin(url) {
  try {
    return !!new URL(url).origin
  } catch (error) {
    return false
  }
}

function convertToAbsolutePath(origin, href) {
  if (checkOrigin(href)) {
    return href
  }

  // TODO: 인스티즈 specific한 로직 개선.
  // invalid relative path를 고칠 좋은 방법을 찾지 못함
  return origin + href.replace('..', '')
}

export default async ({ url, selector, selectorsForUnneccessaryNode = [] }) => {
  try {
    const parser = await loadParser(url)
    const links = parser
      .remove(selectorsForUnneccessaryNode)
      .getNodesList(selector)
      .map(element => element.attr('href'))
      .map(href => convertToAbsolutePath(new URL(url).origin, href))

    return links
  } catch (e) {
    console.log(e)
    return []
  }
}

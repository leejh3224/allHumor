import { URL } from 'url'

import axios from 'axios'
import Parser from 'lib/parser'

async function getDocument(targetUrl) {
  const { data: document } = await axios.get(targetUrl)
  return document
}

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
    const document = await getDocument(url)
    const parser = new Parser({
      document,
      options: {
        // 라틴 계열의 문자가 아닌 문자를 파싱하기 위해 꺼야함
        // https://github.com/cheeriojs/cheerio/issues/866
        decodeEntities: false,
      },
    })

    const links = parser
      .remove(selectorsForUnneccessaryNode)
      .getNodes(selector)
      .map(element => element.attr('href'))
      .map(href => convertToAbsolutePath(new URL(url).origin, href))

    return links
  } catch (e) {
    console.log(e)
    return []
  }
}

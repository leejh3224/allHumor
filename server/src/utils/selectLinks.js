import { URL } from 'url'

import loadParser from 'utils/loadParser'
import checkRelativePath from 'utils/common/checkRelativePath'

export default async ({ url, selector, selectorsForUnneccessaryNode = [] }) => {
  try {
    const parser = await loadParser(url)

    const { origin } = new URL(url)
    const links = parser
      .remove(selectorsForUnneccessaryNode)
      .getNodesList(selector)
      .map(element => element.attr('href'))
      .map((href) => {
        if (checkRelativePath(href)) {
          return href.replace(/[.]{1,2}/, origin)
        }
        return href
      })

    return links
  } catch (e) {
    console.log(e)
    return []
  }
}

import { URL } from 'url'
import getSelectors from './getSelectors'

function hasSearchParams(url) {
  const { searchParams } = new URL(url)
  return !!Array.from(searchParams).length
}

function fromPathname(pathname) {
  const [articleId] = pathname.match(/\d+/)
  return articleId
}

function fromQueryString(searchParams) {
  // INFO
  // articleIdKeys는 사이트를 추가할 때마다 update가 필요
  const articleIdKeys = ['postNum', 'no', 'document_srl']
  const [articleId] = articleIdKeys.map(key => searchParams.get(key)).filter(value => value)
  return articleId
}

function getArticleId(url) {
  if (hasSearchParams(url)) {
    const { searchParams } = new URL(url)
    return fromQueryString(searchParams)
  }
  const { pathname } = new URL(url)
  return fromPathname(pathname)
}

function convertToISODate(date) {
  const isValidDateString = !!Date.parse(date)

  if (isValidDateString) {
    return new Date(date)
  }
  // TODO: 인스티즈를 위한 핵 개선
  // 캡쳐된 값이 1시간전 (2018.02.11) 이런 식이라 핵 사용.
  const [, instizUploadDate] = date.match(/\((.+)\)/)
  return new Date(instizUploadDate)
}

export default ({ url, parser, additionalFields = {} }) => {
  const {
    authorSelector,
    titleSelector,
    uploadDateSelector,
    selectorsForUnneccessaryNode = [],
  } = getSelectors(url)

  const newParser = parser.remove(selectorsForUnneccessaryNode)

  const uploadDate = newParser.text(uploadDateSelector)

  const article = {
    articleId: getArticleId(url),
    author: newParser.text(authorSelector),
    title: newParser.text(titleSelector),
    uploadDate: convertToISODate(uploadDate),
    originalLink: url,
    ...additionalFields,
  }

  return article
}

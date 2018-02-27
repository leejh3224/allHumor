import getSelectors from './getSelectors'

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
    author: newParser.text(authorSelector),
    title: newParser.text(titleSelector),
    uploadDate: convertToISODate(uploadDate),
    originalLink: url,
    ...additionalFields,
  }

  return article
}

import head from 'lodash/head'

export default (src) => {
  const imageNameRegex = /([^/.]+).(gif|jpe?g|tiff|png)?$/i
  const imageName = head(src.match(imageNameRegex))
  // already encoded
  if (/%/g.test(src)) {
    return imageName.replace(/%/g, '_')
  }
  // not encoded
  if (/[가-힇\s]+/g.test(src)) {
    return encodeURI(imageName).replace(/%/g, '_')
  }
  return imageName
}

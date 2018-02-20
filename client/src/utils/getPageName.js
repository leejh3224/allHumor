export default currentLocation => {
  const homePageRegex = /\/(humor|soccer|bitcoin|idol)/
  const detailPageRegex = /\/[a-f\d]{24}/i
  const searchPageRegex = /\/search/

  if (currentLocation === '/' || homePageRegex.test(currentLocation)) {
    return 'home'
  } else if (detailPageRegex.test(currentLocation)) {
    return 'detail'
  } else if (searchPageRegex.test(currentLocation)) {
    return 'search'
  }
  return ''
}

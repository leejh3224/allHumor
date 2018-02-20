export default currentLocation => {
  const pagesWithoutHeaderRegex = /\/(login|callback|register)/

  return !pagesWithoutHeaderRegex.test(currentLocation)
}

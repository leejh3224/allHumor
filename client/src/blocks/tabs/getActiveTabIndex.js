export default (tabNames, currentLocation) => {
  const categoryRegex = /(humor|soccer|bitcoin|idol)/
  const hasCategoryInPathname = categoryRegex.test(currentLocation)
  let category

  if (hasCategoryInPathname) {
    [category] = currentLocation.match(categoryRegex)
  }
  if (currentLocation === '/') {
    return 0
  }
  return tabNames.findIndex(name => name === category)
}

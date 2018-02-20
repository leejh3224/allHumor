import translate from 'utils/translate'
import getPageName from 'utils/getPageName'

export default (currentLocation, category) => {
  const pageName = getPageName(currentLocation)

  if (pageName === 'home') {
    return 'All 유머'
  } else if (pageName === 'detail') {
    return translate(category)
  }
  return '검색'
}

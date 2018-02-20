import React from 'react'
import { Tabs } from 'blocks'
import { SearchForm } from 'components'

export default currentLocation => {
  const detailPageRegex = /[a-f\d]{24}$/
  const searchPageRegex = /\/search/
  const atDetailPage = detailPageRegex.test(currentLocation)
  const atSearchPage = searchPageRegex.test(currentLocation)

  if (atDetailPage) {
    return null
  } else if (atSearchPage) {
    return <SearchForm />
  }
  return <Tabs />
}

import React from 'react'

import WithAuth0 from 'pages/WithAuth0'
import { SearchResultList } from 'blocks'

const Search = () => (
  <div>
    <SearchResultList />
  </div>
)

Search.propTypes = {}

export default WithAuth0(Search)

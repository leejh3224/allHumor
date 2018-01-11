import React from 'react'
// import PropTypes from 'prop-types'
import { Header } from 'layout'
import { PreviewListContainer, PaginationContainer, CategoryGroupContainer } from 'containers'

/* eslint-disable */
const Home = () => (
  <div>
    <Header />
    <CategoryGroupContainer />
    <PreviewListContainer />
    <PaginationContainer />
  </div>
)

export default Home

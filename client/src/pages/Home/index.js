import React from 'react'
import { bool, shape, func } from 'prop-types'
import { Header } from 'layout'
import StickyOnScroll from 'pages/StickyOnScroll'
import {
  PreviewListContainer,
  PaginationContainer,
  CategoryGroupContainer,
} from 'containers'

const Home = ({ isSticky, auth: { isAuthenticated, logout } }) => (
  <div>
    <Header isLoggedIn={isAuthenticated()} logout={logout} />
    <CategoryGroupContainer isSticky={isSticky} />
    <section css={{ paddingTop: isSticky ? 50 : 0 }}>
      <PreviewListContainer />
    </section>
    <PaginationContainer />
  </div>
)

Home.propTypes = {
  isSticky: bool.isRequired,
  auth: shape({ isAuthenticated: func.isRequired }).isRequired,
}

export default StickyOnScroll(Home)

import React from 'react'
import { bool, shape, func } from 'prop-types'
import StickyOnScroll from 'pages/StickyOnScroll'
import {
  PreviewListContainer,
  PaginationContainer,
  CategoryGroupContainer,
  HeaderContainer,
} from 'containers'

const Home = ({ isSticky, auth: { isAuthenticated, logout } }) => (
  <div>
    <HeaderContainer isLoggedIn={isAuthenticated()} logout={logout} />
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

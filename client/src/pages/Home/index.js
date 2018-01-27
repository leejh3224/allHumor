import React from 'react'
import { bool } from 'prop-types'
import StickyOnScroll from 'pages/StickyOnScroll'
import {
  PreviewListContainer,
  PaginationContainer,
  CategoryGroupContainer,
  HeaderContainer,
} from 'containers'
import { isAuthenticated, logout } from 'utils/auth'

const Home = ({ isSticky }) => (
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
}

export default StickyOnScroll(Home)

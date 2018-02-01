import React from 'react'
import StickyOnScroll from 'pages/StickyOnScroll'
import {
  PreviewListContainer,
  PaginationContainer,
  CategoryGroupContainer,
  HeaderContainer,
} from 'containers'
import { isAuthenticated, logout } from 'utils/auth'
import categories from 'globals/categories'

const Home = () => (
  <StickyOnScroll>
    {({ isSticky }) => (
      <div>
        <HeaderContainer isLoggedIn={isAuthenticated()} logout={logout} />
        <CategoryGroupContainer isSticky={isSticky} categories={categories} />
        <section css={{ paddingTop: isSticky ? 50 : 0 }}>
          <PreviewListContainer />
        </section>
        <PaginationContainer />
      </div>
    )}
  </StickyOnScroll>
)

Home.propTypes = {}

export default Home

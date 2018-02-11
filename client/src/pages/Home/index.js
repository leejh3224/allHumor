import React from 'react'

import StickyOnScroll from 'pages/StickyOnScroll'
import { PreviewFeedList } from 'blocks'
import { MainWrapper } from 'components'
import { PaginationContainer, CategoryGroupContainer, HeaderContainer } from 'containers'
import { isAuthenticated, logout } from 'utils/auth'
import categories from 'globals/categories'
import WithAuth0 from 'pages/WithAuth0'

const Home = () => (
  <StickyOnScroll>
    {({ isSticky }) => (
      <MainWrapper>
        <HeaderContainer isLoggedIn={isAuthenticated()} logout={logout} />
        <CategoryGroupContainer isSticky={isSticky} categories={categories} />
        <section css={{ paddingTop: isSticky ? 50 : 0 }}>
          <PreviewFeedList />
        </section>
        <PaginationContainer />
      </MainWrapper>
    )}
  </StickyOnScroll>
)

Home.propTypes = {}

export default WithAuth0(Home)

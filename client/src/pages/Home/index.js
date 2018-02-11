import React from 'react'

import StickyOnScroll from 'pages/StickyOnScroll'
import ScrollDetector from 'pages/ScrollDetector'
import { Header } from 'layout'
import { PreviewFeedList } from 'blocks'
import { MainWrapper } from 'components'
import { CategoryGroupContainer } from 'containers'
import { isAuthenticated, logout } from 'utils/auth'
import categories from 'globals/categories'
import WithAuth0 from 'pages/WithAuth0'

const Home = () => (
  <StickyOnScroll>
    {({ isSticky }) => (
      <ScrollDetector>
        {({ isAtTheBottom }) => (
          <MainWrapper>
            <Header isLoggedIn={isAuthenticated()} logout={logout} />
            <CategoryGroupContainer isSticky={isSticky} categories={categories} />
            <section css={{ paddingTop: isSticky ? 50 : 0 }}>
              <PreviewFeedList isAtTheBottom={isAtTheBottom} />
            </section>
          </MainWrapper>
        )}
      </ScrollDetector>
    )}
  </StickyOnScroll>
)

Home.propTypes = {}

export default WithAuth0(Home)

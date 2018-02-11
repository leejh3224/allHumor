import React from 'react'
import { shape, string } from 'prop-types'

import StickyOnScroll from 'pages/StickyOnScroll'
import ScrollDetector from 'pages/ScrollDetector'
import { Header } from 'layout'
import { Article, CommentList, CommentForm } from 'blocks'
import { MainWrapper } from 'components'
import { CategoryGroupContainer } from 'containers'
import WithAuth0 from 'pages/WithAuth0'
import { isAuthenticated, logout } from 'utils/auth'
import categories from 'globals/categories'

const Detail = ({ location: { pathname } }) => {
  const idRegex = /[^/]+/
  const articleId = idRegex.exec(pathname)[0]
  return (
    <StickyOnScroll>
      {({ isSticky }) => (
        <ScrollDetector>
          {({ isAtTheBottom }) => (
            <MainWrapper>
              <Header isLoggedIn={isAuthenticated()} logout={logout} />
              <CategoryGroupContainer isSticky={isSticky} categories={categories} />
              <section css={{ paddingTop: isSticky ? 50 : 0 }}>
                <Article articleId={articleId} isLoggedIn={isAuthenticated()} />
              </section>
              <CommentList isLoggedIn={isAuthenticated()} isAtTheBottom={isAtTheBottom} />
              <div css={{ paddingBottom: 144 }} />
              <div
                css={{
                  position: 'fixed',
                  bottom: 0,
                  width: '100%',
                }}
              >
                <CommentForm />
              </div>
            </MainWrapper>
          )}
        </ScrollDetector>
      )}
    </StickyOnScroll>
  )
}

Detail.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
}

export default WithAuth0(Detail)

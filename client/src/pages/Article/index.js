import React from 'react'
import { shape, string } from 'prop-types'
import StickyOnScroll from 'pages/StickyOnScroll'
import ScrollToBottomDetector from 'pages/ScrollToBottomDetector'
import {
  ArticleContentContainer,
  CategoryGroupContainer,
  CommentsContainer,
  HeaderContainer,
} from 'containers'
import { isAuthenticated, logout } from 'utils/auth'
import categories from 'globals/categories'

const Article = ({ location: { pathname } }) => {
  const idRegex = /(article)\/([\w]{0,})/
  const articleId = idRegex.exec(pathname)[2]
  return (
    <StickyOnScroll>
      {({ isSticky }) => (
        <ScrollToBottomDetector>
          {({ isAtTheBottom }) => (
            <div>
              <HeaderContainer isLoggedIn={isAuthenticated()} logout={logout} />
              <CategoryGroupContainer isSticky={isSticky} categories={categories} />
              <section css={{ paddingTop: isSticky ? 50 : 0 }}>
                <ArticleContentContainer articleId={articleId} isLoggedIn={isAuthenticated()} />
              </section>
              <CommentsContainer isAtTheBottom={isAtTheBottom} />
            </div>
          )}
        </ScrollToBottomDetector>
      )}
    </StickyOnScroll>
  )
}

Article.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
}

export default Article

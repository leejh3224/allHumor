import React from 'react'
import { shape, string, bool } from 'prop-types'
import StickyOnScroll from 'pages/StickyOnScroll'
import ScrollToBottomDetector from 'pages/ScrollToBottomDetector'
import {
  ArticleContentContainer,
  CategoryGroupContainer,
  CommentsContainer,
  HeaderContainer,
} from 'containers'
import { isAuthenticated, logout } from 'utils/auth'

const Article = ({ location: { pathname }, isSticky, isAtTheBottom }) => {
  const idRegex = /(article)\/([\w]{0,})/
  const articleId = idRegex.exec(pathname)[2]
  return (
    <div>
      <HeaderContainer isLoggedIn={isAuthenticated()} logout={logout} />
      <CategoryGroupContainer isSticky={isSticky} />
      <section css={{ paddingTop: isSticky ? 50 : 0 }}>
        <ArticleContentContainer
          articleId={articleId}
          isLoggedIn={isAuthenticated()}
        />
      </section>
      <CommentsContainer isAtTheBottom={isAtTheBottom} />
    </div>
  )
}

Article.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
  isSticky: bool.isRequired,
  isAtTheBottom: bool.isRequired,
}

export default ScrollToBottomDetector(StickyOnScroll(Article))

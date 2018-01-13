import React from 'react'
import { shape, string, bool } from 'prop-types'
import { Header } from 'layout'
import StickyOnScroll from 'pages/StickyOnScroll'
import { ArticleContentContainer, CategoryGroupContainer } from 'containers'

const Article = ({ location: { pathname }, isSticky }) => {
  const idRegex = /(article)\/([\w]{0,})/
  const id = idRegex.exec(pathname)[2]

  return (
    <div>
      <Header />
      <CategoryGroupContainer isSticky={isSticky} />
      <section css={{ paddingTop: isSticky ? 50 : 0 }}>
        <ArticleContentContainer id={id} />
      </section>
    </div>
  )
}

Article.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
  isSticky: bool.isRequired,
}

export default StickyOnScroll(Article)

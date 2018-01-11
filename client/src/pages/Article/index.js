import React from 'react'
import { shape, string } from 'prop-types'
import { Header } from 'layout'
import { ArticleContentContainer } from 'containers'

const Article = ({ location: { pathname } }) => {
  const idRegex = /(article)\/([\w]{0,})/
  const id = idRegex.exec(pathname)[2]

  return (
    <div>
      <Header />
      <div>
        <ArticleContentContainer id={id} />
      </div>
    </div>
  )
}

Article.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
}

export default Article

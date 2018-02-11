import React from 'react'
import { shape } from 'prop-types'

import ThumbsupButton from './thumbsup-button'
import ArticleTemplate from './template'
import Header from './header'
import Content from './content'
import getOriginalLink from './getOriginalLink'

const Base = ({ article }) => {
  const {
    title, site, author, uploadDate, content, articleId,
  } = article
  return (
    <ArticleTemplate
      header={<Header title={title} site={site} author={author} uploadDate={uploadDate} />}
      content={<Content content={content} originalLink={getOriginalLink(site, articleId)} />}
      thumbsupButton={<ThumbsupButton />}
    />
  )
}

Base.propTypes = {
  article: shape().isRequired,
}

export default Base

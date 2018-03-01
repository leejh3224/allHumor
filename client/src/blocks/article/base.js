import React from 'react'
import { shape } from 'prop-types'

import ThumbsupButton from './thumbsup-button'
import ArticleTemplate from './template'
import Header from './header'
import Content from './content'

const Base = ({ article }) => {
  const {
    title, author, uploadDate, body, originalLink,
  } = article
  return (
    <ArticleTemplate
      header={<Header title={title} author={author} uploadDate={uploadDate} />}
      content={<Content content={body} originalLink={originalLink} />}
      thumbsupButton={<ThumbsupButton />}
    />
  )
}

Base.propTypes = {
  article: shape().isRequired,
}

export default Base

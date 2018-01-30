import React from 'react'
import { shape, string } from 'prop-types'

import ArticleContentTemplate from './template'
import Title from './Title'
import ArticleMeta from './ArticleMeta'
import Content from './Content'

const ArticleContent = ({
  article: {
    title, site, author, uploadDate, content,
  },
}) => (
  <ArticleContentTemplate
    title={<Title title={title} />}
    articleMeta={<ArticleMeta site={site} author={author} uploadDate={uploadDate} />}
    content={<Content content={content} />}
  />
)

ArticleContent.propTypes = {
  article: shape({
    title: string.isRequired,
    site: string.isRequired,
    author: string.isRequired,
    uploadDate: string.isRequired,
    content: string.isRequired,
  }).isRequired,
}

export default ArticleContent

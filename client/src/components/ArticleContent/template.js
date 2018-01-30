import React from 'react'
import { element } from 'prop-types'
import { colors, media, spacing } from 'styles/theme'

const ArticleContentTemplate = ({ title, articleMeta, content }) => (
  <div>
    <div
      css={{
          backgroundColor: colors.lighterGrey,

          [media.greaterThan('medium')]: {
            marginBottom: spacing.large,
          },
        }}
    >
      {title}
      {articleMeta}
    </div>
    {content}
  </div>
)

ArticleContentTemplate.propTypes = {
  title: element.isRequired,
  articleMeta: element.isRequired,
  content: element.isRequired,
}

export default ArticleContentTemplate

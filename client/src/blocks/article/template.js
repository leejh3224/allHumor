import React from 'react'
import { element } from 'prop-types'
import { colors, media, spacing } from 'styles/theme'

const ArticleTemplate = ({ header, content, thumbsupButton }) => (
  <div
    css={{
      backgroundColor: colors.white,
      marginTop: spacing.small,
    }}
  >
    <div
      css={{
        [media.greaterThan('medium')]: {
          marginBottom: spacing.large,
        },
      }}
    >
      {header}
    </div>
    {content}
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: spacing.large,
      }}
    >
      {thumbsupButton}
    </div>
  </div>
)

ArticleTemplate.propTypes = {
  header: element.isRequired,
  content: element.isRequired,
  thumbsupButton: element.isRequired,
}

export default ArticleTemplate

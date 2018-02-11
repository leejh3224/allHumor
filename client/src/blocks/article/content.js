import React from 'react'
import { string } from 'prop-types'
import { colors, spacing, media } from 'styles/theme'

const Content = ({ content, originalLink }) => (
  <div
    css={{
      [media.greaterThan('medium')]: {
        padding: spacing.medium,
        maxWidth: 800,
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    }}
  >
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: spacing.small,
        // to align each item inside p tag
        '> p': {
          display: 'flex',
          justifyContent: 'center',
        },
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
    <a
      href={originalLink}
      css={{
        color: colors.grey,
        float: 'right',
      }}
    >
      원본: {originalLink}
    </a>
  </div>
)

Content.propTypes = {
  content: string.isRequired,
  originalLink: string.isRequired,
}

export default Content

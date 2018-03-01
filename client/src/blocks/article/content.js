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
        marginBottom: spacing.small,
        textAlign: 'center',
        '> p': {
          textAlign: 'center',
        },
        ' > div': {
          textAlign: 'center',
        },
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
    <a
      href={originalLink}
      css={{
        color: colors.grey,
        float: 'right',
        marginTop: spacing.small,
      }}
    >
      원본 게시물 보기
    </a>
  </div>
)

Content.propTypes = {
  content: string.isRequired,
  originalLink: string.isRequired,
}

export default Content

import React from 'react'
import { string } from 'prop-types'
import { spacing, fonts, colors, media } from 'styles/theme'
import formatDate from 'utils/formatDate'

const toKorean = {
  dogdrip: '개드립',
}

const colorMap = {
  dogdrip: colors.primary,
}

const ArticleMeta = ({ site, author, uploadDate }) => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: spacing.medium,
      paddingTop: 0,

      [media.greaterThan('medium')]: {
        maxWidth: 800,
        marginRight: 'auto',
        marginLeft: 'auto',
      },
    }}
  >
    <div
      css={{
        ...fonts.small,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <span
        css={{
          display: 'inline-block',
          color: colorMap[site],
          border: `1px solid ${colors.primary}`,
          borderRadius: 10,
          lineHeight: 1.15,
          padding: spacing.xsmall,
          marginRight: spacing.small,
          ...fonts.xsmall,
        }}
      >
        {toKorean[site]}
      </span>
      {author}
    </div>
    <p css={{ ...fonts.small }}>{formatDate(uploadDate)}</p>
  </div>
)

ArticleMeta.propTypes = {
  site: string.isRequired,
  author: string.isRequired,
  uploadDate: string.isRequired,
}

export default ArticleMeta

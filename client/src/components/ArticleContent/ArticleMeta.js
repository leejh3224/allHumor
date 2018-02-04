import React from 'react'
import { string } from 'prop-types'
import { spacing, fonts, colors, media } from 'styles/theme'
import formatDate from 'utils/formatDate'

const toKorean = {
  dogdrip: '개드립',
  kickoff: '킥오프',
  ddengle: '땡글',
}

const colorMap = {
  dogdrip: colors.primary,
  kickoff: colors.kickoff,
  ddengle: colors.black,
}

const ArticleMeta = ({
  site, author, uploadDate, originalArticleUrl,
}) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.small,
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
            border: `1px solid ${colorMap[site]}`,
            borderRadius: 10,
            lineHeight: 1.15,
            padding: spacing.xsmall,
            marginRight: spacing.small,
            ...fonts.xsmall,
          }}
        >
          {toKorean[site]}
        </span>
        <span>{author}</span>
      </div>
      <p css={{ ...fonts.small }}>{formatDate(uploadDate)}</p>
    </div>
    <span
      css={{
        ...fonts.xsmall,
        textAlign: 'right',
      }}
    >
      원본 <a href={originalArticleUrl}>{originalArticleUrl}</a>
    </span>
  </div>
)

ArticleMeta.propTypes = {
  site: string.isRequired,
  author: string.isRequired,
  uploadDate: string.isRequired,
  originalArticleUrl: string.isRequired,
}

export default ArticleMeta

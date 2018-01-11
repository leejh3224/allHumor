import React from 'react'
import { shape, string } from 'prop-types'
import { spacing, fonts, colors, media } from 'styles/theme'
import formatDate from 'utils/formatDate'

const toKorean = {
  dogdrip: '개드립',
}

const colorMap = {
  dogdrip: colors.primary,
}

const ArticleContent = ({ article }) => (
  <div>
    <div
      css={{
        backgroundColor: colors.lighterGrey,

        [media.greaterThan('medium')]: {
          marginBottom: spacing.large,
        },
      }}
    >
      <h1
        css={{
          ...fonts.huge,
          padding: spacing.medium,

          [media.greaterThan('medium')]: {
            padding: spacing.large,
            textAlign: 'center',
          },
        }}
      >
        {article.title}
      </h1>
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
        <p
          css={{
            ...fonts.small,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            css={{
              display: 'inline-block',
              color: colorMap[article.site],
              border: `1px solid ${colors.primary}`,
              borderRadius: 10,
              lineHeight: 1.15,
              padding: spacing.xsmall,
              marginRight: spacing.small,
              ...fonts.xsmall,
            }}
          >
            {toKorean[article.site]}
          </span>
          {article.author}
        </p>
        <p css={{ ...fonts.small }}>{formatDate(article.uploadDate)}</p>
      </div>
    </div>
    <div
      css={{
        padding: spacing.medium,

        [media.greaterThan('medium')]: {
          maxWidth: 800,
          marginRight: 'auto',
          marginLeft: 'auto',
        },
      }}
      dangerouslySetInnerHTML={{ __html: article.content }}
    />
  </div>
)

/* eslint-disable */
ArticleContent.propTypes = {
  article: shape({
    title: string.isRequired,
  }).isRequired,
}

export default ArticleContent

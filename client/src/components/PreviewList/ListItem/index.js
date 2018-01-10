import React from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from 'utils/formatDate'
import { ShareButton } from 'components'
import { colors, spacing, media, fonts } from 'styles/theme'
// import { css } from 'emotion'
import styles from './ListItem.sass'

const flex = {
  display: 'flex',
}

/* eslint-disable */
const ListItem = ({ id, thumbnail, title, author, date, site }) => (
  <Link className={styles.link} to={`/article/${id}`}>
    <li>
      <article
        css={{
          display: 'flex',
          backgroundColor: colors.lighterGrey,
          borderBottom: `0.5px solid ${colors.divider}`,
          padding: spacing.medium,
          ':hover': {
            backgroundColor: colors.lightGrey,
          },

          [media.lessThan('medium')]: {
            padding: spacing.small,
          },
        }}
      >
        <figure>
          <img
            css={{
              width: 150,
              height: 200,
              marginRight: spacing.medium,

              [media.greaterThan('small')]: {
                width: 180,
                height: 220,
              },
            }}
            src={thumbnail}
            alt="썸네일"
          />
        </figure>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <div
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <h1
              css={{
                display: 'inline-block',
                marginTop: 3,
                marginRight: spacing.small,
                ...fonts.header,
              }}
            >
              {title}
            </h1>
            <span
              css={{
                backgroundColor: colors.primaryDarker,
                borderRadius: 10,
                color: colors.white,
                verticalAlign: 'middle',
                padding: spacing.xsmall,
                ...fonts.small,
              }}
            >
              {site === 'dogdrip' ? '개드립' : ''}
            </span>
          </div>
          <div css={{ flex: 1 }}>
            <h2 className={styles.author}>
              {author}
              <span css={{ flex: 1, textAlign: 'right' }}>{formatDate(date)}</span>
            </h2>
          </div>
          <div css={{ ...flex, alignItems: 'flex-end' }}>
            <div className={styles.meta}>
              <i className="ion-ios-chatbubble-outline" /> 12
            </div>
            <div className={styles.meta}>
              <i className="ion-thumbsup" /> 12
            </div>
            <ShareButton />
          </div>
        </div>
      </article>
    </li>
  </Link>
)

ListItem.propTypes = {
  thumbnail: string.isRequired,
  title: string.isRequired,
  author: string.isRequired,
  date: string.isRequired,
  id: string.isRequired,
  site: string.isRequired,
}

export default ListItem

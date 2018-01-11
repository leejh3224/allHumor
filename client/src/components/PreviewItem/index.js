import React from 'react'
import { shape, string } from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from 'utils/formatDate'
import { colors, spacing, media } from 'styles/theme'
import { Header, Thumbnail, Footer } from './elements'

const PreviewItem = ({ article }) => {
  const {
    thumbnail, title, author, uploadDate, _id,
  } = article
  return (
    <Link css={{ textDecoration: 'none' }} to={`/article/${_id}`}>
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
          <Thumbnail url={`../../../${thumbnail || 'images/noimage.jpg'}`} />
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <Header title={title} author={author} date={formatDate(uploadDate)} />
            <Footer />
          </div>
        </article>
      </li>
    </Link>
  )
}

PreviewItem.propTypes = {
  article: shape({
    thumbnail: string.isRequired,
    title: string.isRequired,
    author: string.isRequired,
    uploadDate: string.isRequired,
    _id: string.isRequired,
  }).isRequired,
}

export default PreviewItem

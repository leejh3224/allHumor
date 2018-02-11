import React from 'react'
import { shape } from 'prop-types'
import { Link } from 'react-router-dom'

import PreviewItemTemplate from './template'
import Thumbnail from './Thumbnail'
import Header from './Header'
import Footer from './Footer'

const escapeThumbnailSrc = src =>
  (src ? src.replace(/[()]/g, matched => `\\${matched}`) : 'images/noimage.jpg')

const PreviewItem = ({ article }) => {
  const {
    _id, thumbnail, title, author, uploadDate, voteCount, commentCount,
  } = article
  return (
    <Link
      css={{
        textDecoration: 'none',
      }}
      to={`/${_id}`}
    >
      <PreviewItemTemplate
        thumbnail={
          <Thumbnail
            image={`../../../${
              thumbnail === 'video' ? 'images/video.png' : escapeThumbnailSrc(thumbnail)
            }`}
          />
        }
        header={<Header title={title} author={author} />}
        footer={<Footer date={uploadDate} voteCount={voteCount} commentCount={commentCount} />}
      />
    </Link>
  )
}

PreviewItem.propTypes = {
  article: shape({}).isRequired,
}

export default PreviewItem

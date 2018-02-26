import React from 'react'
import { shape } from 'prop-types'
import { Link } from 'react-router-dom'

import { Timestamp } from 'components'
import PreviewItemTemplate from './template'
import Thumbnail from './Thumbnail'
import Header from './Header'
import Footer from './Footer'

const PreviewItem = ({ preview }) => {
  const {
    _id, thumbnail, title, author, uploadDate, voteCount, commentCount,
  } = preview
  return (
    <Link
      css={{
        textDecoration: 'none',
      }}
      to={`/${_id}`}
    >
      <PreviewItemTemplate
        thumbnail={<Thumbnail image={thumbnail} />}
        header={<Header title={title} author={author} />}
        footer={
          <Footer
            timestamp={<Timestamp date={uploadDate} />}
            voteCount={voteCount}
            commentCount={commentCount}
          />
        }
      />
    </Link>
  )
}

PreviewItem.propTypes = {
  preview: shape({}).isRequired,
}

export default PreviewItem

import React from 'react'
import { shape, string, number } from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from 'utils/formatDate'
import PreviewItemTemplate from './template'
import Thumbnail from './Thumbnail'
import Header from './Header'
import Footer from './Footer'

const PreviewItem = ({ article }) => {
  const {
    _id,
    thumbnail,
    title,
    author,
    uploadDate,
    voteCount,
    commentCount,
  } = article
  return (
    <Link
      css={{
        textDecoration: 'none',
      }}
      to={`/article/${_id}`}
    >
      <PreviewItemTemplate
        thumbnail={
          <Thumbnail
            url={`../../../article/${thumbnail || 'images/noimage.jpg'}`}
          />
        }
        header={
          <Header title={title} author={author} date={formatDate(uploadDate)} />
        }
        footer={<Footer voteCount={voteCount} commentCount={commentCount} />}
      />
    </Link>
  )
}

PreviewItem.propTypes = {
  article: shape({
    _id: string.isRequired,
    thumbnail: string,
    title: string.isRequired,
    author: string.isRequired,
    uploadDate: string.isRequired,
    voteCount: number.isRequired,
    commentCount: number.isRequired,
  }).isRequired,
}

export default PreviewItem

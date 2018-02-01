import React from 'react'
import { shape, string, number } from 'prop-types'
import { Link } from 'react-router-dom'
import formatDate from 'utils/formatDate'
import PreviewItemTemplate from './template'
import Thumbnail from './Thumbnail'
import Header from './Header'
import Footer from './Footer'
import ListDecoration from './ListDecoration'

const PreviewItem = ({ article, listStyle, rank }) => {
  const {
    _id, thumbnail, title, author, uploadDate, voteCount, commentCount,
  } = article
  return (
    <Link
      css={{
        textDecoration: 'none',
      }}
      to={`/article/${_id}`}
    >
      <PreviewItemTemplate
        decorator={listStyle === 'popularity' ? <ListDecoration rank={rank} /> : null}
        thumbnail={
          <Thumbnail
            url={`../../../article/${
              thumbnail === 'video' ? 'images/video.png' : thumbnail || 'images/noimage.jpg'
            }`}
            small={listStyle === 'popularity'}
          />
        }
        header={<Header title={title} author={author} date={formatDate(uploadDate)} />}
        footer={<Footer voteCount={voteCount} commentCount={commentCount} />}
      />
    </Link>
  )
}

PreviewItem.propTypes = {
  article: shape({}).isRequired,
  listStyle: string.isRequired,
  rank: number.isRequired,
}

export default PreviewItem

import React from 'react'
import { string } from 'prop-types'

const Thumbnail = ({ image }) => (
  <div
    css={{
      width: '100%',
      height: '100%',
      background: `url(${image}) no-repeat top`,
      backgroundSize: 'cover',
      borderRadius: '6px 0 0 6px',
    }}
  />
)

Thumbnail.propTypes = {
  image: string.isRequired,
}

export default Thumbnail

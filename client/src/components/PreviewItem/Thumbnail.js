import React from 'react'
import { string } from 'prop-types'
import { spacing, media } from 'styles/theme'

const Thumbnail = ({ url }) => (
  <figure>
    <img
      css={{
        width: 120,
        height: 150,
        marginRight: spacing.medium,

        [media.greaterThan('small')]: {
          width: 180,
          height: 220,
        },
      }}
      src={url}
      alt="썸네일"
    />
  </figure>
)

Thumbnail.propTypes = {
  url: string.isRequired,
}

export default Thumbnail

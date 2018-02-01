import React from 'react'
import { string, bool } from 'prop-types'
import { spacing, media } from 'styles/theme'

const Thumbnail = ({ url, small }) => (
  <figure>
    <img
      css={{
        width: small ? 100 : 120,
        height: 150,
        marginRight: spacing.small,

        [media.greaterThan('small')]: {
          width: 180,
          height: 220,
          marginRight: spacing.medium,
        },
      }}
      src={url}
      alt="썸네일"
    />
  </figure>
)

Thumbnail.propTypes = {
  url: string.isRequired,
  small: bool.isRequired,
}

export default Thumbnail

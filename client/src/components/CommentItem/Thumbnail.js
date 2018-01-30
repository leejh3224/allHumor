import React from 'react'
import { string, bool } from 'prop-types'
import { spacing } from 'styles/theme'

const Thumbnail = ({ avatar = '', small }) => (
  <figure
    css={{
      width: small ? 30 : 50,
      height: small ? 30 : 50,
      marginRight: spacing.medium,
    }}
  >
    <img
      css={{
        width: small ? 30 : 50,
        height: '100%',
        borderRadius: '100%',
      }}
      src={avatar}
      alt="아바타"
    />
  </figure>
)

Thumbnail.defaultProps = {
  small: false,
}

Thumbnail.propTypes = {
  avatar: string.isRequired,
  small: bool,
}

export default Thumbnail

import React from 'react'
import { string } from 'prop-types'

const Background = ({ src }) => (
  <img
    css={{
      objectFit: 'cover',
      width: 'auto',
      height: '100%',
    }}
    src={src}
    alt=""
  />
)

Background.propTypes = {
  src: string.isRequired,
}

export default Background

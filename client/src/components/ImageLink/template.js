import React from 'react'
import { number, element } from 'prop-types'
import { Link } from 'react-router-dom'

const ImageLinkTemplate = ({
  width, height, overlay, background,
}) => (
  <Link
    css={{
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      width,
      height,
      marginRight: 20,
      ':hover > div': {
        display: 'flex',
      },
    }}
    to="/"
  >
    {overlay}
    {background}
  </Link>
)

ImageLinkTemplate.propTypes = {
  width: number.isRequired,
  height: number.isRequired,
  overlay: element.isRequired,
  background: element.isRequired,
}

export default ImageLinkTemplate

import React from 'react'
import { string } from 'prop-types'

import ImageLinkTemplate from './template'
import Overlay from './Overlay'
import Background from './Background'

const ImageLink = ({ name, imageName }) => (
  <ImageLinkTemplate
    width={150}
    height={150}
    overlay={<Overlay name={name} />}
    background={<Background src={`${process.env.PUBLIC_URL}images/${imageName}`} />}
  />
)

ImageLink.propTypes = {
  name: string.isRequired,
  imageName: string.isRequired,
}

export default ImageLink

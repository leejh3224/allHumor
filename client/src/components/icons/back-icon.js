import React from 'react'

import { IconDefaultProps, IconPropTypes } from 'propTypes/IconPropTypes'

const BackIcon = ({ color, cssProps, onClick }) => (
  <svg
    id="Capa_1"
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="25"
    viewBox="0 0 459 459"
    css={cssProps}
    onClick={onClick}
  >
    <polygon
      fill={color}
      points="459,204 96.9,204 188.7,112.2 153,76.5 0,229.5 153,382.5 188.7,346.8 96.9,255 459,255"
      id="keyboard-backspace"
    />
  </svg>
)

BackIcon.defaultProps = IconDefaultProps
BackIcon.propTypes = IconPropTypes

export default BackIcon

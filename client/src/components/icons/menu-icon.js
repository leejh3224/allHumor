import React from 'react'

import { IconDefaultProps, IconPropTypes } from 'propTypes/IconPropTypes'

const MenuIcon = ({ color, cssProps }) => (
  <svg
    version="1"
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 256.000000 256.000000"
    css={cssProps}
  >
    <g fill={color}>
      <path
        d="M232 2060 c-48 -30 -72 -75 -72 -140 0 -65 24 -110 72 -140 32 -20 53 -20 1048 -20 995 0 1016 0 1048 20 48 30 72 75 72 140 0 65 -24 110 -72 140 -32 20 -53 20 -1048 20 -995 0 -1016 0 -1048 -20z"
        transform="matrix(.1 0 0 -.1 0 256)"
      />
      <path
        d="M232 1420 c-48 -30 -72 -75 -72 -140 0 -65 24 -110 72 -140 32 -20 53 -20 1048 -20 995 0 1016 0 1048 20 48 30 72 75 72 140 0 65 -24 110 -72 140 -32 20 -53 20 -1048 20 -995 0 -1016 0 -1048 -20z"
        transform="matrix(.1 0 0 -.1 0 256)"
      />
      <path
        d="M232 780 c-48 -30 -72 -75 -72 -140 0 -65 24 -110 72 -140 32 -20 53 -20 1048 -20 995 0 1016 0 1048 20 48 30 72 75 72 140 0 65 -24 110 -72 140 -32 20 -53 20 -1048 20 -995 0 -1016 0 -1048 -20z"
        transform="matrix(.1 0 0 -.1 0 256)"
      />
    </g>
  </svg>
)

MenuIcon.defaultProps = IconDefaultProps
MenuIcon.propTypes = IconPropTypes

export default MenuIcon

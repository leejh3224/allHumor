import React from 'react'

import { IconDefaultProps, IconPropTypes } from 'propTypes/IconPropTypes'

const RefreshIcon = ({ color, cssProps }) => (
  <svg
    version="1"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 256.000000 256.000000"
    css={cssProps}
  >
    <path
      fill={color}
      d="M1115 2480 l-59 -60 88 -89 88 -88 -74 -6 c-404 -35 -788 -330 -928 -715 -72 -196 -91 -435 -51 -627 90 -427 399 -753 821 -865 126 -33 370 -39 500 -12 323 68 577 247 746 527 88 145 154 361 154 508 l0 68 -82 -3 -83 -3 -2 -50 c-16 -321 -213 -627 -506 -785 -145 -78 -277 -111 -447 -111 -170 0 -302 33 -447 111 -498 268 -657 899 -346 1368 49 73 142 172 215 229 127 97 311 173 460 189 l63 6 -85 -86 -85 -86 63 -62 62 -63 192 193 193 192 -190 190 c-104 104 -192 190 -195 190 -3 0 -32 -27 -65 -60z"
      transform="matrix(.1 0 0 -.1 0 256)"
    />
  </svg>
)

RefreshIcon.defaultProps = IconDefaultProps
RefreshIcon.propTypes = IconPropTypes

export default RefreshIcon

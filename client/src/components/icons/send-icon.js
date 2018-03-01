import React from 'react'

import { colors } from 'styles/theme'
import { IconDefaultProps, IconPropTypes } from 'propTypes/IconPropTypes'

const SendIcon = ({ color, cssProps }) => (
  <svg
    version="1"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 1600.000000 1600.000000"
    css={cssProps}
  >
    <path
      fill={color}
      d="M940 15044 c0 -5 422 -1366 938 -3024 l938 -3015 6094 -2 c3352 -1 6086 2 6075 7 -11 4 -3168 1363 -7015 3020 -3847 1657 -7003 3015 -7012 3017 -10 3 -18 1 -18 -3z"
      transform="matrix(.1 0 0 -.1 0 1600)"
    />
    <path
      fill={color}
      d="M2817 7993 c-11 -19 -1879 -6034 -1875 -6038 3 -4 9231 3963 13938 5990 l125 54 -6092 1 c-3350 0 -6094 -3 -6096 -7z"
      transform="matrix(.1 0 0 -.1 0 1600)"
    />
  </svg>
)

SendIcon.defaultProps = {
  ...IconDefaultProps,
  color: colors.grey,
}
SendIcon.propTypes = IconPropTypes

export default SendIcon

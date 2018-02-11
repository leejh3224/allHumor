import React from 'react'
import { string, shape } from 'prop-types'

import { colors } from 'styles/theme'

const SendIcon = ({ color = colors.grey, cssProps }) => (
  <svg
    version="1"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 512.000000 512.000000"
    css={cssProps}
  >
    <path
      fill={color}
      d="M2560 3845 c-1344 -646 -2446 -1178 -2447 -1182 -1 -4 397 -183 885 -398 l887 -390 440 -882 c242 -485 443 -883 446 -883 3 0 507 1097 1119 2438 612 1340 1117 2445 1122 2455 5 9 5 17 1 16 -4 0 -1108 -528 -2453 -1174z m1340 198 c-1682 -1693 -1955 -1964 -1969 -1960 -18 5 -1286 564 -1315 579 -15 8 332 178 1830 898 1017 489 1851 889 1854 889 2 1 -178 -182 -400 -406z m-279 -1588 l-856 -1875 -332 667 c-183 368 -332 674 -330 680 1 9 2357 2393 2373 2402 1 1 -384 -843 -855 -1874z"
      transform="matrix(.1 0 0 -.1 0 512)"
    />
  </svg>
)

SendIcon.propTypes = {
  color: string.isRequired,
  cssProps: shape().isRequired,
}

export default SendIcon

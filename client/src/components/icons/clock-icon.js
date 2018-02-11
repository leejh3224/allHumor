import React from 'react'
import { string, shape } from 'prop-types'

import { colors } from 'styles/theme'

const ClockIcon = ({ color = colors.grey, cssProps }) => (
  <svg
    version="1"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 200.000000 200.000000"
    css={cssProps}
  >
    <g fill={color}>
      <path
        d="M800 1986 c-306 -64 -563 -263 -700 -541 -79 -159 -95 -236 -95 -445 0 -209 16 -286 95 -445 125 -253 367 -454 635 -526 102 -27 322 -37 432 -19 417 67 756 406 823 823 18 110 8 330 -19 432 -51 190 -184 392 -341 518 -98 78 -250 157 -365 188 -102 27 -364 36 -465 15z m435 -101 c81 -23 209 -83 285 -135 168 -114 309 -315 366 -520 27 -94 26 -357 0 -455 -86 -322 -339 -575 -661 -661 -98 -26 -361 -27 -455 0 -266 74 -482 257 -600 510 -56 120 -71 184 -77 337 -8 203 27 347 125 508 131 215 348 373 587 425 93 21 344 15 430 -9z"
        transform="matrix(.1 0 0 -.1 0 200)"
      />
      <path
        d="M960 1392 l0 -367 -140 -140 -140 -139 32 -33 32 -33 148 147 148 148 0 392 0 393 -40 0 -40 0 0 -368z"
        transform="matrix(.1 0 0 -.1 0 200)"
      />
    </g>
  </svg>
)

ClockIcon.propTypes = {
  color: string.isRequired,
  cssProps: shape().isRequired,
}

export default ClockIcon

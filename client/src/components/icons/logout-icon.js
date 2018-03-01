import React from 'react'

import { IconDefaultProps, IconPropTypes } from 'propTypes/IconPropTypes'

const LogoutIcon = ({ color, cssProps, onClick }) => (
  <svg
    version="1"
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 440.000000 440.000000"
    css={cssProps}
    onClick={onClick}
  >
    <g fill={color}>
      <path
        d="M2112 4380 c-19 -12 -41 -38 -52 -63 -19 -40 -20 -74 -20 -827 0 -753 1 -787 20 -827 26 -58 69 -83 142 -83 52 0 62 3 97 36 31 28 42 47 51 88 7 36 10 294 8 823 l-3 769 -25 36 c-13 20 -36 43 -51 52 -39 23 -126 21 -167 -4z"
        transform="matrix(.1 0 0 -.1 0 440)"
      />
      <path
        d="M1459 3806 c-1011 -410 -1502 -1565 -1092 -2571 235 -580 724 -1011 1323 -1169 193 -51 270 -60 510 -60 252 0 337 11 544 70 452 130 848 422 1106 814 215 328 320 683 320 1085 0 187 -18 337 -60 499 -143 555 -537 1032 -1056 1280 -86 42 -225 96 -245 96 -5 0 -9 -68 -9 -162 l0 -163 108 -51 c422 -202 759 -596 887 -1039 39 -135 56 -245 62 -398 26 -648 -332 -1254 -914 -1546 -167 -83 -305 -128 -503 -162 -112 -20 -393 -17 -515 5 -685 124 -1204 625 -1357 1312 -19 86 -22 129 -22 329 -1 218 1 236 28 350 120 513 442 919 908 1143 l118 57 0 163 c0 148 -2 162 -17 162 -10 -1 -66 -20 -124 -44z"
        transform="matrix(.1 0 0 -.1 0 440)"
      />
    </g>
  </svg>
)

LogoutIcon.defaultProps = IconDefaultProps
LogoutIcon.propTypes = IconPropTypes

export default LogoutIcon

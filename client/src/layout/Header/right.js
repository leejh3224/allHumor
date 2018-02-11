import React from 'react'
import { bool } from 'prop-types'
import { Link } from 'react-router-dom'

import { colors, fonts } from 'styles/theme'

const baseLinkStyle = {
  color: colors.white,
  textDecoration: 'none',
  ...fonts.header,
}

const Right = ({ isLoggedIn }) =>
  (isLoggedIn ? (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        width: 21,
      }}
    >
      <Link to="/search">
        <i
          className="ion-ios-search-strong"
          css={{
            color: colors.white,
            ...fonts.icon,
          }}
        />
      </Link>
    </div>
  ) : (
    <Link to="/login" css={baseLinkStyle}>
      로그인
    </Link>
  ))

Right.propTypes = {
  isLoggedIn: bool.isRequired,
}

export default Right

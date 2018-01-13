import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { colors, spacing, fonts } from 'styles/theme'
import { compose } from 'recompose'

const baseLinkStyle = {
  color: colors.white,
  textDecoration: 'none',
  ...fonts.header,
}

const Header = () => (
  <header
    css={{
      position: 'relative',
      backgroundColor: colors.primary,
    }}
  >
    <nav
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: spacing.medium,
      }}
    >
      <Link
        to="/all/1"
        css={{
          fontStyle: 'italic',
          ...baseLinkStyle,
        }}
      >
        ALL유머
      </Link>
      <Link to="/login" css={{ ...baseLinkStyle }}>
        로그인
      </Link>
    </nav>
  </header>
)

export default compose(withRouter)(Header)

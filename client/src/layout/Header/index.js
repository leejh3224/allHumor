import React from 'react'
import { shape, string } from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { colors, spacing, fonts } from 'styles/theme'
import HeaderLink from './HeaderLink'

const baseLinkStyle = {
  color: colors.white,
  textDecoration: 'none',
  ...fonts.header,
}

const Header = ({ location: { pathname } }) => (
  <header css={{ backgroundColor: colors.primary }}>
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
    <nav
      css={{
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      <HeaderLink to="/all/1" active={/(all|dogdrip)\/[0-9]{1,}/.test(pathname)}>
        새 글
      </HeaderLink>
      <HeaderLink to="/share" active={/share/.test(pathname)}>
        공유
      </HeaderLink>
      <HeaderLink to="/search" active={/search/.test(pathname)}>
        검색
      </HeaderLink>
    </nav>
  </header>
)

Header.propTypes = {
  location: shape({ pathname: string.isRequired }).isRequired,
}

export default withRouter(Header)

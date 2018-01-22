import React from 'react'
import { bool, func } from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { colors, spacing, fonts } from 'styles/theme'
import { compose } from 'recompose'

const baseLinkStyle = {
  color: colors.white,
  textDecoration: 'none',
  ...fonts.header,
}

const Header = ({ isLoggedIn, logout, loadArticles }) => (
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
        to="/"
        onClick={() => loadArticles('all', 1)}
        css={{
          fontStyle: 'italic',
          ...baseLinkStyle,
        }}
      >
        ALL유머
      </Link>
      {isLoggedIn ? (
        <Link
          to="/"
          css={{ ...baseLinkStyle }}
          onClick={(e) => {
            e.preventDefault()
            logout()
          }}
        >
          로그아웃
        </Link>
      ) : (
        <Link to="/login" css={{ ...baseLinkStyle }}>
          로그인
        </Link>
      )}
    </nav>
  </header>
)

Header.defaultProps = {
  isLoggedIn: false,
  logout: () => {},
}

Header.propTypes = {
  isLoggedIn: bool,
  logout: func,
  loadArticles: func.isRequired,
}

export default compose(withRouter)(Header)

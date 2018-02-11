import React from 'react'
import { bool, func } from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { colors, spacing, fonts } from 'styles/theme'
import { EllipsisButton } from 'blocks'

const baseLinkStyle = {
  color: colors.white,
  textDecoration: 'none',
  ...fonts.header,
}

const Header = ({ isLoggedIn, loadNewest, logout }) => (
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
        alignItems: 'center',
        padding: spacing.medium,
      }}
    >
      <Link
        to="/"
        onClick={loadNewest}
        css={{
          fontStyle: 'italic',
          ...baseLinkStyle,
        }}
      >
        ALL유머
      </Link>
      {isLoggedIn ? (
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            width: 50,
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
          <EllipsisButton
            iconColor={colors.white}
            actions={[
              {
                name: '로그아웃',
                onClick: logout,
              },
            ]}
          />
        </div>
      ) : (
        <Link to="/login" css={baseLinkStyle}>
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
  loadNewest: func.isRequired,
  logout: func,
}

export default compose(withRouter)(Header)

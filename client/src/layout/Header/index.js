import React from 'react'
import { bool, func } from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { colors, spacing, fonts } from 'styles/theme'
import { ActionButton } from 'components'
import WithMenuState from 'components/WithMenuState'
import { compose } from 'recompose'

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
        // <Link
        //   to="/"
        //   css={{ ...baseLinkStyle }}
        //   onClick={(e) => {
        //     e.preventDefault()
        //     logout()
        //   }}
        // >
        //   로그아웃
        // </Link>
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
          <WithMenuState>
            {({ isMenuVisible, handleOpenMenu, handleCloseMenu }) => (
              <ActionButton
                iconColor={colors.white}
                isMenuVisible={isMenuVisible}
                onClickActionButton={isMenuVisible ? handleCloseMenu : handleOpenMenu}
                actions={[
                  {
                    name: '로그아웃',
                    onClick: logout,
                  },
                ]}
              />
            )}
          </WithMenuState>
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

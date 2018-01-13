import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { colors, fonts, spacing, media } from 'styles/theme'

const Login = () => (
  <div
    css={{
      backgroundColor: colors.grey,
      width: '100%',
      padding: spacing.medium,
    }}
  >
    <Link to="/">
      <i
        className="ion-chevron-left"
        css={{
          color: colors.primary,
          ...fonts.icon,
          paddingLeft: spacing.small,

          [media.greaterThan('small')]: {
            display: 'none',
          },
        }}
      />
    </Link>
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <h1
        css={{
          color: colors.white,
          fontStyle: 'italic',
          ...fonts.huge,
          padding: spacing.medium,
        }}
      >
        ALL 유머
      </h1>
      <input type="text" placeholder="메일주소" />
      <input type="text" placeholder="비밀번호" />
      <input type="button" value="로그인" />
    </div>
  </div>
)

Login.propTypes = {}

export default Login

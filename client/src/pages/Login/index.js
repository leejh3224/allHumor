import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { colors, fonts, spacing, media } from 'styles/theme'

const baseButtonStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: colors.white,
  borderRadius: 30,
  boxShadow: `0 4px 2px -2px ${colors.black}`,
  padding: spacing.small,
  marginBottom: spacing.small,
  width: 280,
  ...fonts.xsmall,
}

const Login = () => (
  <div
    css={{
      backgroundColor: colors.grey,
      width: '100%',
      height: '100vh',
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
      <p
        css={{
          color: colors.white,
          textAlign: 'center',
          ...fonts.small,
        }}
      >
        간편하게 가입하고 웃긴 자료를 받아보세요.
      </p>
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: spacing.large,
          marginBottom: spacing.medium,
        }}
      >
        <button
          css={{
            ...baseButtonStyle,
            backgroundColor: colors.white,
            color: colors.black,
          }}
        >
          <i
            className="ion-ios-email-outline"
            css={{
              fontSize: 24.6,
              marginTop: 2,
              marginRight: spacing.small,
            }}
          />
          이메일로 가입하기
        </button>
        <button
          css={{
            ...baseButtonStyle,
            backgroundColor: colors.facebook,
          }}
        >
          <img
            css={{
              width: 30,
              height: 30,
              marginRight: spacing.small,
            }}
            src={`${process.env.PUBLIC_URL}images/facebook.png`}
            alt="페이스북"
          />
          페이스북으로 계속하기
        </button>
        <button
          css={{
            ...baseButtonStyle,
            backgroundColor: colors.twitter,
          }}
        >
          <img
            css={{
              width: 30,
              height: 30,
              marginRight: spacing.small,
            }}
            src={`${process.env.PUBLIC_URL}images/twitter.png`}
            alt="트위터"
          />
          트위터로 계속하기
        </button>
        <button
          css={{
            ...baseButtonStyle,
            backgroundColor: colors.black,
          }}
        >
          <img
            css={{
              width: 30,
              height: 30,
              marginRight: spacing.small,
            }}
            src={`${process.env.PUBLIC_URL}images/github.png`}
            alt="깃허브"
          />
          깃허브로 계속하기
        </button>
      </div>
      <p
        css={{
          color: colors.white,
          marginBottom: spacing.large,
          ...fonts.body,
        }}
      >
        이미 계정이 있으신가요?{' '}
        <Link
          to="/register"
          css={{
            marginLeft: spacing.small,
            color: colors.white,
            fontWeight: 900,
          }}
        >
          로그인하기
        </Link>
      </p>
      <p css={{ color: colors.white, ...fonts.body }}>회원가입을 하게 되면</p>
      <p css={{ color: colors.white, ...fonts.body }}>약관에 동의한 것으로 간주됩니다.</p>
    </div>
  </div>
)

Login.propTypes = {}

export default Login

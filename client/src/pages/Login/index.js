import React from 'react'
import { string, func } from 'prop-types'
import { Link } from 'react-router-dom'
import { colors, fonts, spacing, media } from 'styles/theme'
import ReactRouterPropTypes from 'react-router-prop-types'
import Auth from 'utils/auth'

const auth = new Auth()

const baseButtonStyle = {
  display: 'flex',
  alignItems: 'center',
  color: colors.white,
  borderRadius: 30,
  boxShadow: `0 4px 2px -2px ${colors.black}`,
  padding: spacing.small,
  marginBottom: spacing.small,
  width: 250,
  ...fonts.xsmall,
}

const socialIconStyle = {
  width: 30,
  height: 30,
  marginRight: spacing.small,
  marginLeft: spacing.medium,
}

const Login = ({ view, switchView, history }) => (
  <div
    css={{
      display: 'flex',
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
          color: colors.white,
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
          onClick={() => history.replace('/register')}
        >
          <i
            className="ion-ios-email-outline"
            css={{
              fontSize: 24.6,
              marginTop: 2,
              marginRight: spacing.small,
              marginLeft: spacing.medium,
            }}
          />
          {view === 'login' ? '이메일로 로그인하기' : '이메일로 가입하기'}
        </button>
        <button
          css={{
            ...baseButtonStyle,
            backgroundColor: colors.facebook,
          }}
          onClick={() => auth.socialLogin('facebook')}
        >
          <img
            css={{
              ...socialIconStyle,
              marginLeft: spacing.small, // 좀 더 자연스러운 간격을 위해
            }}
            src={`${process.env.PUBLIC_URL}images/facebook.png`}
            alt="페이스북"
          />
          페이스북으로 계속하기
        </button>
        <button
          css={{
            ...baseButtonStyle,
            backgroundColor: colors.google,
          }}
          onClick={() => auth.socialLogin()} // default provider is google
        >
          <img
            css={socialIconStyle}
            src={`${process.env.PUBLIC_URL}images/google.png`}
            alt="구글"
          />
          구글로 계속하기
        </button>
        <button
          css={{
            ...baseButtonStyle,
            backgroundColor: colors.twitter,
          }}
        >
          <img
            css={socialIconStyle}
            src={`${process.env.PUBLIC_URL}images/twitter.png`}
            alt="트위터"
          />
          트위터로 계속하기
        </button>
        <button
          css={{
            ...baseButtonStyle,
            color: colors.black,
            backgroundColor: colors.lighterGrey,
          }}
        >
          <img
            css={socialIconStyle}
            src={`${process.env.PUBLIC_URL}images/instagram.png`}
            alt="인스타그램"
          />
          인스타그램으로 계속하기
        </button>
      </div>
      <p
        css={{
          color: colors.white,
          marginBottom: spacing.large,
          ...fonts.body,
        }}
      >
        {view === 'login' ? '처음이신가요?' : '이미 계정이 있으신가요?'}
        {/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <a
          onClick={switchView}
          css={{
            color: colors.white,
            fontWeight: 700,
            marginLeft: spacing.small,
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {view === 'login' ? '가입하기' : '로그인하기'}
        </a>
      </p>
      <p css={{ color: colors.white, ...fonts.xsmall }}>
        회원가입을 하게 되면 약관에 동의한
      </p>
      <p css={{ color: colors.white, ...fonts.xsmall }}>것으로 간주됩니다.</p>
    </div>
  </div>
)

Login.propTypes = {
  view: string.isRequired,
  switchView: func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
}

export default Login

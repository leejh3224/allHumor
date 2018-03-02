import React from 'react'
import { bool } from 'prop-types'
import { keyframes } from 'react-emotion'

import { colors, spacing } from 'styles/theme'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const loaderStyle = {
  width: 50,
  height: 50,
  borderRadius: '50%',
  border: '5px solid transparent',
  borderTopColor: colors.black,
  borderBottomColor: colors.black,
  animation: `${spin} 1.5s linear infinite`,
}

const wrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  minHeight: '100vh',
}

const singleSpinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
}

const spinner = (
  <div
    css={{
      width: 60,
      height: 60,
      borderRadius: '50%',
      backgroundColor: colors.white,
      boxShadow: `0 2px 6px ${colors.grey}`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing.small,
      marginBottom: spacing.small,
    }}
  >
    <div css={loaderStyle} />
  </div>
)

export const Loading = ({ wrapped }) => (
  <div css={wrapped ? wrapperStyle : singleSpinnerStyle}>{spinner}</div>
)

export const SimpleLoading = () => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <div css={loaderStyle} />
  </div>
)

Loading.defaultProps = {
  wrapped: true,
}

Loading.propTypes = {
  wrapped: bool,
}

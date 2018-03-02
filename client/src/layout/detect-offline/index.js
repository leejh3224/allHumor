import React from 'react'
// import PropTypes from 'prop-types'
import { Offline, Online } from 'react-detect-offline'
import { keyframes } from 'react-emotion'

import { colors, fonts, spacing } from 'styles/theme'

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(180px);
    display: none;
  }
`

const DetectOffline = () => [
  <div
    key="onlinewrapper"
    css={{
      'animation-delay': '0.5s',
      animation: `${slideDown} 4s forwards`,
      position: 'fixed',
      bottom: 0,
    }}
  >
    <Online>
      <span
        css={{
          display: 'block',
          color: colors.white,
          ...fonts.body,
          backgroundColor: colors.success,
          width: '100vw',
          padding: `${spacing.xsmall}px 0`,
          textAlign: 'center',
        }}
      >
        연결되었습니다.
      </span>
    </Online>
  </div>,
  <Offline key="offline">
    <span
      css={{
        display: 'block',
        color: colors.white,
        ...fonts.body,
        backgroundColor: colors.alert,
        width: '100vw',
        padding: `${spacing.xsmall}px 0`,
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
      }}
    >
      인터넷 연결 상태를 확인해주세요.
    </span>
  </Offline>,
]

DetectOffline.propTypes = {}

export default DetectOffline

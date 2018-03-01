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
    transform: translateY(32px);
  }
`

const DetectOffline = () => (
  <div
    css={{
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

          // animation starts 0.5s after load
          'animation-delay': '0.5s',
          animation: `${slideDown} 2s forwards`,
        }}
      >
        연결되었습니다.
      </span>
    </Online>
    <Offline>
      <span
        css={{
          display: 'block',
          color: colors.white,
          ...fonts.body,
          backgroundColor: colors.alert,
          width: '100vw',
          padding: `${spacing.xsmall}px 0`,
          textAlign: 'center',
        }}
      >
        인터넷 연결 상태를 확인해주세요.
      </span>
    </Offline>
  </div>
)

DetectOffline.propTypes = {}

export default DetectOffline

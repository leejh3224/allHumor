import React from 'react'
// import PropTypes from 'prop-types'
import { spacing, fonts } from 'styles/theme'

const buttonStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: spacing.medium,
  ...fonts.small,
  cursor: 'pointer',
}

const Naviation = () => (
  <div
    css={{
      display: 'flex',
      width: '100%',
      justifyContent: 'space-between',
    }}
  >
    <button css={buttonStyle}>
      <i
        className="ion-chevron-left"
        css={{
          marginBottom: spacing.small,
        }}
      />
      <span>이전글</span>
    </button>
    <button css={buttonStyle}>
      <i
        className="ion-chevron-right"
        css={{
          marginBottom: spacing.small,
        }}
      />
      <span>다음글</span>
    </button>
  </div>
)

Naviation.propTypes = {}

export default Naviation

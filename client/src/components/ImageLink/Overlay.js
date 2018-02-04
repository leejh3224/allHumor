import React from 'react'
import { string } from 'prop-types'
import { lighten, colors } from 'styles/theme'

const Overlay = ({ name }) => (
  <div
    css={{
      display: 'none',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      backgroundColor: lighten(colors.black, 0.6),
      cursor: 'pointer',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
    }}
  >
    <span
      css={{
        color: colors.white,
      }}
    >
      {name}
    </span>
  </div>
)

Overlay.propTypes = {
  name: string.isRequired,
}

export default Overlay

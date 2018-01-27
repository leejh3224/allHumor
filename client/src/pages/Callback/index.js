import React from 'react'
import { colors } from 'styles/theme'

const Callback = () => (
  <div
    css={{
      backgroundColor: colors.primary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
    }}
  >
    <img src={`${process.env.PUBLIC_URL}images/loading.svg`} alt="" />
  </div>
)

export default Callback

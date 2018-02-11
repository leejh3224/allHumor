import React from 'react'
import { element } from 'prop-types'

import { colors } from 'styles/theme'

// main wrapper: for common style
const MainWrapper = ({ children }) => (
  <main css={{ backgroundColor: colors.skyblue }}>{children}</main>
)

MainWrapper.propTypes = {
  children: element.isRequired,
}

export default MainWrapper

import React from 'react'
import { element } from 'prop-types'

import { colors, spacing } from 'styles/theme'

// main wrapper: for common style
const MainWrapper = ({ children }) => (
  <main css={{ backgroundColor: colors.skyblue, paddingBottom: spacing.small }}>{children}</main>
)

MainWrapper.propTypes = {
  children: element.isRequired,
}

export default MainWrapper

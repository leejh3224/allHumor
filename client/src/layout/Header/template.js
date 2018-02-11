import React from 'react'
import { element } from 'prop-types'

import { colors, spacing } from 'styles/theme'

const HeaderTemplate = ({ logo, right }) => (
  <header
    css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.medium,
        position: 'relative',
        backgroundColor: colors.primary,
      }}
  >
    {logo}
    {right}
  </header>
)

HeaderTemplate.propTypes = {
  logo: element.isRequired,
  right: element.isRequired,
}

export default HeaderTemplate

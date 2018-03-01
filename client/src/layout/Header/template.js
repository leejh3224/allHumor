import React from 'react'
import { element, oneOfType, bool } from 'prop-types'

import { colors, spacing } from 'styles/theme'

const HeaderTemplate = ({
  left, logo, right, bottom,
}) => (
  <header
    css={{
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: colors.primary,
      borderBottom: `1px solid ${colors.primary}`,
    }}
  >
    <div
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        padding: `${spacing.small}px ${spacing.medium}px`,
      }}
    >
      <div css={{ display: 'flex', alignItems: 'center' }}>{left}</div>
      <div>{logo}</div>
      <div>{right}</div>
    </div>
    {bottom}
  </header>
)

HeaderTemplate.defaultProps = {
  bottom: null,
}

HeaderTemplate.propTypes = {
  left: element.isRequired,
  logo: element.isRequired,
  right: oneOfType([element, bool]).isRequired,
  bottom: element,
}

export default HeaderTemplate

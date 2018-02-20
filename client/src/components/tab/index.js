import React from 'react'
import { node, string, func } from 'prop-types'

import { BaseStyleLink } from 'components'

const Tab = ({ to, children, onClick }) => (
  <BaseStyleLink
    to={to}
    onClick={onClick}
    cssProps={{ display: 'inline-block', flex: 1, textAlign: 'center' }}
  >
    {children}
  </BaseStyleLink>
)

Tab.propTypes = {
  to: string.isRequired,
  children: node.isRequired,
  onClick: func.isRequired,
}

export default Tab

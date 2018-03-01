import React from 'react'
import { arrayOf, string, number, func, bool } from 'prop-types'

import { Tab } from 'components'
import { spacing, colors } from 'styles/theme'
import translate from 'utils/translate'
import Slider from './slider'

const Base = ({
  tabsWidth, names = [], activeTabIndex, onTabClick, isSticky,
}) => (
  <div
    css={{
      width: '100%',
      backgroundColor: colors.primary,
      position: isSticky ? 'fixed' : 'static',
    }}
  >
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        padding: `${spacing.small}px 0`,
        position: 'relative',
      }}
    >
      {names.map(name => (
        <Tab key={name} to={`/${name}`} onClick={event => onTabClick(event, name)}>
          {translate(name)}
        </Tab>
      ))}
      <Slider tabsWidth={tabsWidth} numberOfTabs={names.length} activeTabIndex={activeTabIndex} />
    </div>
  </div>
)

Base.propTypes = {
  tabsWidth: number.isRequired,
  names: arrayOf(string).isRequired,
  activeTabIndex: number.isRequired,
  onTabClick: func.isRequired,
  isSticky: bool.isRequired,
}

export default Base

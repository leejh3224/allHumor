import React from 'react'
import { arrayOf, string, number, func } from 'prop-types'

import { Tab } from 'components'
import { spacing } from 'styles/theme'
import translate from 'utils/translate'
import Slider from './slider'

const Base = ({
  tabsWidth, names = [], activeTabIndex, onTabClick,
}) => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'center',
      padding: `${spacing.small}px 0`,
      position: 'relative',
    }}
  >
    {names.map(name => (
      <Tab to={`/${name}`} onClick={onTabClick}>
        {translate(name)}
      </Tab>
    ))}
    <Slider tabsWidth={tabsWidth} numberOfTabs={names.length} activeTabIndex={activeTabIndex} />
  </div>
)

Base.propTypes = {
  tabsWidth: number.isRequired,
  names: arrayOf(string).isRequired,
  activeTabIndex: number.isRequired,
  onTabClick: func.isRequired,
}

export default Base

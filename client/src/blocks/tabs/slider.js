import React from 'react'
import { number } from 'prop-types'

import { colors } from 'styles/theme'

/* eslint-disable no-mixed-operators */
const Slider = ({ tabsWidth, numberOfTabs, activeTabIndex }) => (
  <span
    css={{
      width: tabsWidth / numberOfTabs,
      height: 3,
      backgroundColor: colors.white,
      position: 'absolute',
      bottom: 0,
      left: 0,
      transform: `translateX(${tabsWidth / numberOfTabs * activeTabIndex}px)`,
      transition: 'transform 0.3s ease-out',
    }}
  />
)

Slider.propTypes = {
  numberOfTabs: number.isRequired,
  activeTabIndex: number.isRequired,
  tabsWidth: number.isRequired,
}

export default Slider

import React from 'react'
import { string, bool } from 'prop-types'
import { colors } from 'styles/theme'
import { compose } from 'recompose'
import categories from 'globals/categories'
import StickyOnScroll from './StickyOnScroll'
import TabLink from './TabLink'

const CategoryGroup = ({ isSticky, activeCategory }) => (
  <nav
    css={{
      position: isSticky ? 'fixed' : 'static',
      top: 0,
      width: '100%',
      backgroundColor: colors.primary,
      display: 'flex',
      overflowX: 'scroll',
    }}
  >
    {Object.keys(categories).map(eng => (
      <TabLink key={eng} to={`/${eng}/1`} active={eng === activeCategory}>
        {categories[eng]}
      </TabLink>
    ))}
  </nav>
)

CategoryGroup.propTypes = {
  isSticky: bool.isRequired,
  activeCategory: string.isRequired,
}

export default compose(StickyOnScroll)(CategoryGroup)

import React from 'react'
import { string, bool, func } from 'prop-types'
import { colors } from 'styles/theme'
import categories from 'globals/categories'
import TabLink from './TabLink'

const CategoryGroup = ({ isSticky, activeCategory, loadNewCategory }) => (
  <nav
    css={{
      position: isSticky ? 'fixed' : 'static',
      top: 0,
      width: '100%',
      backgroundColor: colors.primary,
      display: 'flex',
      overflowX: 'scroll',
      transition: 'position 0.3s ease-out',
      zIndex: '10',
    }}
  >
    {Object.keys(categories).map(pathName => (
      <TabLink
        key={pathName}
        to={`/${pathName}/1`}
        active={pathName === activeCategory}
        onClick={() => loadNewCategory(pathName)}
      >
        {categories[pathName]}
      </TabLink>
    ))}
  </nav>
)

CategoryGroup.propTypes = {
  isSticky: bool.isRequired,
  activeCategory: string.isRequired,
  loadNewCategory: func.isRequired,
}

export default CategoryGroup

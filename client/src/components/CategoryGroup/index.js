import React from 'react'
import { string, bool, func, arrayOf, shape } from 'prop-types'
import { colors, zIndex } from 'styles/theme'
import TabLink from './TabLink'

const CategoryGroup = ({
  isSticky, activeCategory, loadNewCategory, categories,
}) => (
  <nav
    css={{
      position: isSticky ? 'fixed' : 'static',
      top: 0,
      backgroundColor: colors.primary,
      width: '100%',
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      transition: 'position 0.3s ease-out',
      zIndex: zIndex.categoryGroup,
    }}
  >
    {Object.keys(categories).map(pathName => (
      <TabLink
        key={pathName}
        to={`/${pathName}/1`}
        active={pathName === activeCategory}
        onClick={() => loadNewCategory(pathName)}
        flex={Object.keys(categories).length < 4 ? 1 : '0 0 auto'}
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
  categories: arrayOf(shape()).isRequired,
}

export default CategoryGroup

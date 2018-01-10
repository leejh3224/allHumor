import React from 'react'
import { string } from 'prop-types'
import { Link } from 'react-router-dom'
import { colors, spacing } from 'styles/theme'
import { containerStyle } from 'styles/mixin'
import { css } from 'emotion'

const categories = {
  전체: 'all',
  개드립: 'dogdrip',
  오유: 'all',
  디씨: 'all',
  네이트판: 'all',
  인스티즈: 'all',
}

const baseLinkStyle = {
  textDecoration: 'none',
  textAlign: 'center',
}

const activeStyle = {
  backgroundColor: colors.primary,
  color: colors.white,
}

const CategoryGroup = ({ activeCategory }) => (
  <nav
    css={{
      ...containerStyle,
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      width: '100%',
      padding: spacing.medium,
    }}
  >
    {Object.keys(categories).map(ko => (
      <Link
        key={ko}
        to={`/${categories[ko]}/1`}
        css={css(
          {
            backgroundColor: colors.lighterGrey,
            flex: 1,
            minWidth: 120,
            padding: spacing.small,
            ...baseLinkStyle,
            ':hover': activeStyle,
          },
          categories[ko] === activeCategory && activeStyle,
        )}
      >
        {ko}
      </Link>
    ))}
  </nav>
)

CategoryGroup.propTypes = {
  activeCategory: string.isRequired,
}

export default CategoryGroup

import React from 'react'
import { string } from 'prop-types'
import { spacing, fonts } from 'styles/theme'

const Header = ({ title, author, date }) => [
  <div
    key="previewItemTitle"
    css={{
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: spacing.xsmall,
    }}
  >
    <h1
      css={{
        display: 'inline-block',
        marginTop: 3,
        ...fonts.header,
      }}
    >
      {title}
    </h1>
  </div>,
  <div
    key="previewItemAuthorAndDate"
    css={{
      display: 'flex',
      justifyContent: 'space-between',
      flex: 1,
      ...fonts.small,
    }}
  >
    {author}
    <span>{date}</span>
  </div>,
]

Header.propTypes = {
  title: string.isRequired,
  author: string.isRequired,
  date: string.isRequired,
}

export default Header

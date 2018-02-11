import React from 'react'
import { string } from 'prop-types'

import { colors, fonts, spacing } from 'styles/theme'
import { Timestamp } from 'components'

const Header = ({ author, createdAt }) => (
  <div
    css={{
      display: 'flex',
      alignItems: 'center',
      ...fonts.body,
      fontWeight: 700,
    }}
  >
    <span
      css={{
        marginTop: spacing.xsmall,
      }}
    >
      {author}
    </span>
    <span
      css={{
        width: 3,
        height: 3,
        backgroundColor: colors.black,
        borderRadius: '100%',
        marginLeft: spacing.small,
        marginRight: spacing.small,
      }}
    />
    <Timestamp date={createdAt} textOnly />
  </div>
)

Header.propTypes = {
  author: string.isRequired,
  createdAt: string.isRequired,
}

export default Header

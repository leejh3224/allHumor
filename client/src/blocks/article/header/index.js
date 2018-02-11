import React from 'react'
import { string } from 'prop-types'

import { colors, spacing, media } from 'styles/theme'
import { Timestamp } from 'components'
import Title from './title'

const Header = ({ title, author, uploadDate }) => (
  <div>
    <Title title={title} />
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        padding: spacing.medium,
        paddingTop: 0,

        [media.greaterThan('medium')]: {
          maxWidth: 800,
          marginRight: 'auto',
          marginLeft: 'auto',
        },
      }}
    >
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: spacing.small,
        }}
      >
        <span css={{ color: colors.grey }}>{author}</span>
        <Timestamp date={uploadDate} />
      </div>
    </div>
  </div>
)

Header.propTypes = {
  title: string.isRequired,
  author: string.isRequired,
  uploadDate: string.isRequired,
}

export default Header

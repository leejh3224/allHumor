import React from 'react'
import { string } from 'prop-types'

import { spacing, fonts, media } from 'styles/theme'

const Title = ({ title }) => (
  <h1
    css={{
      ...fonts.large,
      padding: spacing.medium,

      [media.greaterThan('medium')]: {
        padding: spacing.large,
        textAlign: 'center',
      },
    }}
  >
    {title}
  </h1>
)

Title.propTypes = {
  title: string.isRequired,
}

export default Title

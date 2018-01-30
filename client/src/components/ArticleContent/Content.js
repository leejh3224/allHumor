import React from 'react'
import { string } from 'prop-types'
import { spacing, media } from 'styles/theme'

const Content = ({ content }) => (
  <div
    css={{
        padding: spacing.medium,

        [media.greaterThan('medium')]: {
          maxWidth: 800,
          marginRight: 'auto',
          marginLeft: 'auto',
        },
      }}
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

Content.propTypes = {
  content: string.isRequired,
}

export default Content

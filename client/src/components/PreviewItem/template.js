import React from 'react'
import { element } from 'prop-types'
import { colors, spacing, media } from 'styles/theme'

const PreviewItemTemplate = ({
  thumbnail, header, footer, decorator,
}) => (
  <article
    css={{
      display: 'flex',
      backgroundColor: colors.lighterGrey,
      borderBottom: `0.5px solid ${colors.divider}`,
      padding: spacing.medium,
      ':hover': {
        backgroundColor: colors.lightGrey,
      },

      [media.lessThan('medium')]: {
        padding: spacing.xsmall,
      },
    }}
  >
    {decorator}
    {thumbnail}
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      {header}
      {footer}
    </div>
  </article>
)

PreviewItemTemplate.defaultProps = {
  decorator: null,
}

PreviewItemTemplate.propTypes = {
  thumbnail: element.isRequired,
  header: element.isRequired,
  footer: element.isRequired,
  decorator: element,
}

export default PreviewItemTemplate

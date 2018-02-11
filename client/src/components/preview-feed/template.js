import React from 'react'
import { element } from 'prop-types'
import { colors, spacing, media } from 'styles/theme'

const PreviewItemTemplate = ({
  thumbnail, header, footer, decorator,
}) => (
  <article
    css={{
      display: 'flex',
      height: 'calc(130px + 10vw)',
      backgroundColor: colors.white,
      borderRadius: 6,
      boxShadow: `0 3px 8px ${colors.primary}`,
      margin: spacing.medium,
      ':hover': {
        backgroundColor: colors.lighterGrey,
      },

      [media.lessThan('medium')]: {
        margin: spacing.small,
      },
    }}
  >
    {decorator}
    <div css={{ width: 'calc(90px + 12vw)', height: '100%' }}>{thumbnail}</div>
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        padding: spacing.medium,

        [media.lessThan('medium')]: {
          padding: spacing.small,
        },
      }}
    >
      {header && header}
      <div
        css={{
          width: '100%',
          height: 1,
          backgroundColor: colors.lighterGrey,
          marginBottom: spacing.small,
        }}
      />
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

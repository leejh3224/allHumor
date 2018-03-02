import React from 'react'
import { func, string, oneOfType, element } from 'prop-types'

import { SadBabyIcon } from 'components/icons'
import { fonts, spacing } from 'styles/theme'
import { primary } from 'styles/buttonStyle'

const NoResult = ({
  heading, subheading, onClick, buttonContent,
}) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: spacing.xlarge,
      minHeight: '90vh',
    }}
  >
    <SadBabyIcon />
    {heading && (
      <p
        css={{
          ...fonts.header,
        }}
      >
        {heading}
      </p>
    )}
    {subheading && (
      <p
        css={{
          ...fonts.header,
          marginBottom: spacing.medium,
        }}
      >
        {subheading}
      </p>
    )}
    <button
      css={{
        ...primary,
        padding: `${spacing.small}px ${spacing.xlarge}px`,
      }}
      onClick={onClick}
    >
      {buttonContent}
    </button>
  </div>
)

NoResult.defaultProps = {
  subheading: undefined,
}

NoResult.propTypes = {
  heading: string.isRequired,
  subheading: string,
  onClick: func.isRequired,
  buttonContent: oneOfType([string, element]).isRequired,
}

export default NoResult

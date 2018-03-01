import React from 'react'
// import PropTypes from 'prop-types'

import { SadBabyIcon } from 'components/icons'
import { fonts, spacing } from 'styles/theme'

const NoResult = () => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: spacing.xlarge,
    }}
  >
    <SadBabyIcon />
    <p
      css={{
        ...fonts.header,
        marginBottom: spacing.medium,
      }}
    >
      게시물이 존재하지 않습니다 ...
    </p>
  </div>
)

NoResult.propTypes = {}

export default NoResult

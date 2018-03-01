import React from 'react'
// import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { SadBabyIcon } from 'components/icons'
import { fonts, spacing, colors } from 'styles/theme'

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
      이런! 검색결과가 없어요 ㅜ
    </p>
    <Link to="/">
      <button
        css={{
          ...fonts.body,
          color: colors.white,
          backgroundColor: colors.primary,
          borderRadius: 6,
          padding: `${spacing.small}px ${spacing.xlarge}px`,
          cursor: 'pointer',
          boxShadow: `0 2px 6px ${colors.grey}`,
        }}
      >
        홈으로 돌아가기
      </button>
    </Link>
  </div>
)

NoResult.propTypes = {}

export default NoResult

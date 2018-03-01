import React from 'react'
import { string, shape, bool, func } from 'prop-types'
import { css } from 'emotion'

import { colors, fonts, spacing } from 'styles/theme'
import { SendIcon } from 'components/icons'
import WithState from './WithState'

const SendEmail = ({
  email, submitError, isSubmitting, handleInputChange, handleSubmit,
}) => {
  const errorStyle = {
    border: `2px solid ${colors.error}`,
    color: colors.error,
  }
  return (
    <div
      css={{
        padding: spacing.medium,
        paddingTop: spacing.large,
      }}
    >
      <label
        htmlFor="email"
        css={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span css={{ marginBottom: spacing.xsmall, color: colors.white }}>메일주소</span>
        <div
          css={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            type="text"
            placeholder="allhumor@naver.com"
            value={email}
            css={css(
              {
                ...fonts.header,
                width: 220,
                height: 53,
                fontWeight: 'normal',
                textIndent: spacing.small,
              },
              submitError && errorStyle,
            )}
            onChange={handleInputChange}
          />
          <button
            css={{
              backgroundColor: colors.primary,
              padding: `${spacing.small}px ${spacing.medium}px`,
              width: 70,
              height: 53,
            }}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <span
                css={{
                  color: colors.white,
                  ...fonts.header,
                }}
              >
                ...
              </span>
            ) : (
              <SendIcon color={colors.white} />
            )}
          </button>
        </div>
      </label>
      <a
        href="/"
        css={{
          display: 'block',
          color: colors.white,
          marginTop: spacing.medium,
          textAlign: 'center',
        }}
        onClick={e => {
          e.preventDefault()
          handleSubmit()
        }}
      >
        인증메일 다시 보내기
      </a>
    </div>
  )
}

SendEmail.defaultProps = {
  submitError: null,
}

SendEmail.propTypes = {
  email: string.isRequired,
  submitError: shape({}),
  isSubmitting: bool.isRequired,
  handleInputChange: func.isRequired,
  handleSubmit: func.isRequired,
}

export default WithState(SendEmail)

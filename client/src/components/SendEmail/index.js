import React from 'react'
import { string, shape, bool, func } from 'prop-types'
import { colors, fonts, spacing } from 'styles/theme'
import { css } from 'emotion'
import WithState from './WithState'

const SendEmail = ({
  email,
  submitError,
  isSubmitting,
  handleInputChange,
  handleSubmit,
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
          ...fonts.body,
          color: colors.white,
        }}
      >
        메일주소
        <div>
          <input
            type="text"
            placeholder="allhumor@naver.com"
            value={email}
            css={css(
              {
                padding: spacing.small,
                ...fonts.body,
                width: 220,
              },
              submitError && errorStyle,
            )}
            onChange={handleInputChange}
          />
          <button
            css={{
              backgroundColor: colors.primary,
              padding: `${spacing.small}px ${spacing.medium}px`,
            }}
            onClick={handleSubmit}
          >
            {isSubmitting ? (
              <img
                src={`${process.env.PUBLIC_URL}images/loadingSmall.svg`}
                alt="로딩"
              />
            ) : (
              <i
                className="ion-paper-airplane"
                css={{
                  ...fonts.body,
                  color: colors.white,
                }}
              />
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
        onClick={(e) => {
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

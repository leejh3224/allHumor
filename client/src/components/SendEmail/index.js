import React, { Component } from 'react'
import { func } from 'prop-types'
import { colors, fonts, spacing } from 'styles/theme'
import { css } from 'emotion'

class SendEmail extends Component {
  static propTypes = {
    sendMagicLink: func.isRequired,
  }
  state = {
    email: '',
    submitError: null,
    isSubmitting: false,
  }
  handleInputChange = (e) => {
    const { value } = e.target
    this.setState(prev => ({ ...prev, email: value }))
  }
  resetFields = () => {
    this.setState({
      email: '',
      submitError: null,
      isSubmitting: false,
    })
  }
  handleSubmit = async () => {
    const { email } = this.state
    const { sendMagicLink } = this.props

    this.setState(prev => ({ ...prev, isSubmitting: true }))
    sendMagicLink(email, (err) => {
      if (err) {
        return this.setState(prev => ({
          ...prev,
          submitError: err.code,
          isSubmitting: false,
        }))
      }
      alert('메일이 전송되었습니다!')
      this.resetFields()
      return this.setState(prev => ({
        ...prev,
        submitError: null,
        isSubmitting: false,
      }))
    })
  }
  render() {
    const { email, submitError, isSubmitting } = this.state
    const { handleInputChange, handleSubmit } = this

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
}

export default SendEmail

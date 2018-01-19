import React from 'react'
import { shape, func } from 'prop-types'
import { colors, fonts, spacing } from 'styles/theme'
import { SendEmail } from 'components'

const Register = ({ auth: { sendMagicLink } }) => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: colors.grey,
      width: '100%',
      height: '100vh',
      padding: spacing.medium,
      paddingTop: spacing.xlarge,
    }}
  >
    <h1
      css={{
        ...fonts.large,
        color: colors.white,
        padding: spacing.medium,
      }}
    >
      이메일로 가입하기
    </h1>
    <p
      css={{
        ...fonts.small,
        color: colors.lighterGrey,
      }}
    >
      아래에 적힌 주소로 인증메일이 전송됩니다.
    </p>
    <p
      css={{
        ...fonts.small,
        color: colors.lighterGrey,
      }}
    >
      메일에 적힌 링크나 버튼을 누르면 인증이 완료되며,
    </p>
    <p
      css={{
        ...fonts.small,
        color: colors.lighterGrey,
      }}
    >
      링크는 5분 동안만 유효합니다.
    </p>
    <SendEmail sendMagicLink={sendMagicLink} />
    <p
      css={{ color: colors.white, ...fonts.xsmall, paddingTop: spacing.large }}
    >
      회원가입을 하게 되면 약관에 동의한
    </p>
    <p css={{ color: colors.white, ...fonts.xsmall }}>것으로 간주됩니다.</p>
  </div>
)

Register.propTypes = {
  auth: shape({
    sendMagicLink: func.isRequired,
  }).isRequired,
}

export default Register

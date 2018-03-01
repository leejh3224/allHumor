import React from 'react'
import { bool } from 'prop-types'

import { colors } from 'styles/theme'
import { SendIcon } from 'components/icons'

const SendMessageButton = ({ readyToSend }) => (
  <button
    type="submit"
    css={{
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      ':focus': {
        outline: 0,
      },
    }}
  >
    <SendIcon color={readyToSend ? colors.primary : colors.grey} />
  </button>
)

SendMessageButton.propTypes = {
  readyToSend: bool.isRequired,
}

export default SendMessageButton

import React from 'react'

import { SendIcon } from 'components/icons'

const SendMessageButton = () => (
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
    <SendIcon />
  </button>
)

export default SendMessageButton

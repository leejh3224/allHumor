import React from 'react'

import { MagnifyingGlassIcon } from 'components/icons'
import { isAuthenticated } from 'utils/auth'
import { BaseStyleLink } from 'components'

const Right = () =>
  (isAuthenticated() ? (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <BaseStyleLink to="/search">
        <MagnifyingGlassIcon cssProps={{ marginTop: 3 }} />
      </BaseStyleLink>
    </div>
  ) : (
    <BaseStyleLink to="/login">로그인</BaseStyleLink>
  ))

export default Right

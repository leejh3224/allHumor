import React from 'react'
import { func, bool, string } from 'prop-types'

const Left = ({
  pageName, loggedIn, icon: Icon, onClick,
}) => {
  if (!loggedIn && pageName === 'home') {
    return null
  }
  return <Icon cssProps={{ cursor: 'pointer' }} onClick={onClick} />
}

Left.propTypes = {
  icon: func.isRequired,
  onClick: func.isRequired,
  loggedIn: bool.isRequired,
  pageName: string.isRequired,
}

export default Left

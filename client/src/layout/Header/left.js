import React from 'react'
import { func } from 'prop-types'

const Left = ({ icon: Icon, onClick }) => (
  <Icon cssProps={{ cursor: 'pointer' }} onClick={onClick} />
)

Left.propTypes = {
  icon: func.isRequired,
  onClick: func.isRequired,
}

export default Left

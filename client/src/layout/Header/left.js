import React from 'react'
import { element, func } from 'prop-types'

const Left = ({ icon: Icon, onClick }) => (
  <Icon cssProps={{ cursor: 'pointer' }} onClick={onClick} />
)

Left.propTypes = {
  icon: element.isRequired,
  onClick: func.isRequired,
}

export default Left

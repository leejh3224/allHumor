import React from 'react'
// import PropTypes from 'prop-types'
import WithAuth0 from 'pages/WithAuth0'

const NotFound = () => <div>404</div>

NotFound.propTypes = {}

export default WithAuth0(NotFound)

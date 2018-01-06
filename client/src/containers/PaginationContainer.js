import React, { Component } from 'react'
// import PropTypes from 'prop-types'
// import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Pagination } from 'components'

class PaginationContainer extends Component {
  static propTypes = {}
  render() {
    return <Pagination />
  }
}

export default connect(
  state => ({ ...state }),
  () => ({
    // ducks: bindActionCreators(ducks, dispatch),
  }),
)(PaginationContainer)

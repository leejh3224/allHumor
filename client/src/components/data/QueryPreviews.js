import { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'

import * as actions from 'store/modules/previewList/actions'

class QueryPreviews extends Component {
  static propTypes = {
    fetchPreviews: func.isRequired,
  }
  componentDidMount() {
    this.props.fetchPreviews('humor', 1)
  }
  render() {
    return null
  }
}

export default connect(null, actions)(QueryPreviews)

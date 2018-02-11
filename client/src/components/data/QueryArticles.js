import { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'

import * as paginationDucks from 'store/modules/pagination'

class QueryArticles extends Component {
  static propTypes = {
    loadArticles: func.isRequired,
  }
  componentDidMount() {
    this.props.loadArticles()
  }
  render() {
    return null
  }
}

export default connect(null, paginationDucks)(QueryArticles)

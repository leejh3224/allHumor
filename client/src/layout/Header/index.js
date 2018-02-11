import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import * as paginationDucks from 'store/modules/pagination'
import HeaderTemplate from './template'
import Logo from './logo'
import Right from './right'

class Header extends Component {
  static propTypes = {
    loadArticles: func.isRequired,
  }
  loadNewFeed = () => {
    this.props.loadArticles()
  }
  render() {
    return (
      <HeaderTemplate
        logo={<Logo onClick={this.loadNewFeed} />}
        right={<Right isLoggedIn={this.props.isLoggedIn} />}
      />
    )
  }
}

Header.defaultProps = {
  isLoggedIn: false,
  // logout: () => {},
}

Header.propTypes = {
  isLoggedIn: bool,
  // logout: func,
}

export default connect(null, paginationDucks)(withRouter(Header))

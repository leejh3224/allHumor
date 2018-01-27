import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from 'pages/Login'
import * as uiDucks from 'store/modules/ui'

class LoginPageContainer extends Component {
  render() {
    return <Login {...this.props} />
  }
}

export default connect(
  state => ({
    view: uiDucks.getLoginView(state),
  }),
  uiDucks,
)(LoginPageContainer)

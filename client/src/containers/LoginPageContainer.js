import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from 'pages/Login'
import * as loginDucks from 'store/modules/login'

class LoginPageContainer extends Component {
  render() {
    return <Login {...this.props} />
  }
}

export default connect(
  state => ({
    view: loginDucks.selectors.getView(state),
  }),
  {
    switchView: loginDucks.actions.switchView,
  },
)(LoginPageContainer)

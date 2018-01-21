import React from 'react'
// import PropTypes from 'prop-types'
import { Router, Switch, Route } from 'react-router-dom'
// import SwipeableViews from 'react-swipeable-views'
import history from 'utils/history'
import 'styles/globalStyle'
import { LoginPageContainer } from 'containers'
import Auth from 'utils/auth'

import Home from './Home'
import Article from './Article'
import Register from './Register'
import Callback from './Callback'
import NotFound from './NotFound'

const auth = new Auth()

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
}

const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={props => <Home auth={auth} {...props} />} />
      <Route exact path="/login" component={LoginPageContainer} />
      <Route
        exact
        path="/register"
        render={props => <Register auth={auth} {...props} />}
      />
      <Route
        path="/callback"
        render={(props) => {
          handleAuthentication(props)
          return <Callback {...props} />
        }}
      />
      <Route
        exact
        path="/article/:id"
        render={props => <Article auth={auth} {...props} />}
      />
      <Route
        path="/(all|dogdrip)?/:page?"
        render={props => <Home auth={auth} {...props} />}
      />
      <Route component={NotFound} />
    </Switch>
  </Router>
)

export default Routes

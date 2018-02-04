import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { connect } from 'react-redux'
// import SwipeableViews from 'react-swipeable-views'
import history from 'utils/history'
import 'styles/globalStyle'
import { LoginPageContainer } from 'containers'
import WithAuth0 from 'pages/WithAuth0'
import * as userDucks from 'store/modules/user'
import { handleAuthentication } from 'utils/auth'

import Home from './Home'
import Article from './Article'
import Register from './Register'
import Callback from './Callback'
import Search from './Search'
import NotFound from './NotFound'

const Routes = props => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/search" component={Search} />
      <Route
        exact
        path="/login"
        render={routerProps => (
          <LoginPageContainer {...props} {...routerProps} />
        )}
      />
      <Route
        exact
        path="/register"
        render={routerProps => <Register {...props} {...routerProps} />}
      />
      <Route
        path="/callback"
        render={({ location }) => {
          if (/access_token|id_token|error/.test(location.hash)) {
            handleAuthentication()
          }
          return <Callback />
        }}
      />
      <Route
        exact
        path="/:id"
        render={routerProps => <Article {...props} {...routerProps} />}
      />
      <Route
        path="/(all|dogdrip)?/:page?"
        render={routerProps => <Home {...props} {...routerProps} />}
      />
      <Route component={NotFound} />
    </Switch>
  </ConnectedRouter>
)

export default connect(null, userDucks)(WithAuth0(Routes))

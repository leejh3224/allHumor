import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { connect } from 'react-redux'

import history from 'utils/history'
import 'styles/globalStyle'
import { LoginPageContainer } from 'containers'
import * as userDucks from 'store/modules/user'
import { handleAuthentication } from 'utils/auth'
import { MainWrapper } from 'components'
import { Header } from 'layout'
import Home from './Home'
import Detail from './Detail'
import Register from './Register'
import Callback from './Callback'
import Search from './Search'
import NotFound from './NotFound'

const Routes = props => (
  <ConnectedRouter history={history}>
    <MainWrapper>
      <Header />
      <Switch>
        <Route
          exact
          path="/search"
          render={routerProps => <Search {...props} {...routerProps} />}
        />
        <Route
          exact
          path="/login"
          render={routerProps => <LoginPageContainer {...props} {...routerProps} />}
        />
        <Route
          exact
          path="/register"
          render={routerProps => <Register {...props} {...routerProps} />}
        />
        <Route
          exact
          path="/callback"
          render={({ location }) => {
            if (/access_token|id_token|error/.test(location.hash)) {
              handleAuthentication()
            }
            return <Callback />
          }}
        />
        <Route
          path="/"
          render={routerProps => {
            const articleIdRegex = /^\/[a-f\d]{24}$/
            return articleIdRegex.test(routerProps.location.pathname) ? (
              <Route path="/:id" render={() => <Detail {...props} {...routerProps} />} />
            ) : (
              <Route path="/:category" render={() => <Home {...props} {...routerProps} />} />
            )
          }}
        />
        <Route component={NotFound} />
      </Switch>
    </MainWrapper>
  </ConnectedRouter>
)

export default connect(null, userDucks)(Routes)

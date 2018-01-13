import React from 'react'
// import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import SwipeableViews from 'react-swipeable-views'
import 'styles/globalStyle'

import Home from './Home'
import Article from './Article'
import Login from './Login'

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route path="/article/:id" component={Article} />
      <Route path="/(all|dogdrip)?/:page?" component={Home} />
    </Switch>
  </Router>
)

Routes.propTypes = {}

export default Routes

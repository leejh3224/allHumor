import React from 'react'
// import PropTypes from 'prop-types'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import 'styles/globalStyle'

import Home from './Home'
import Article from './Article'

const Routes = () => (
  <Router>
    <Switch>
      <Route path="/article/:id" component={Article} />
      <Route path="/(all|dogdrip)?/:page?" component={Home} />
    </Switch>
  </Router>
)

Routes.propTypes = {}

export default Routes

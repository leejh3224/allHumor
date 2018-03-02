import React, { Component } from 'react'
import { func, string } from 'prop-types'
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactRouterPropTypes from 'react-router-prop-types'

import * as articleReducer from 'store/article/reducer'
import * as actions from 'store/previewList/actions'
import { LogoutIcon, BackIcon } from 'components/icons'
import getPageName from 'utils/getPageName'
import { rendersBottom, requiresHeader, rendersLogoText } from 'layout/utils'
import history from 'utils/history'
import { logout, isAuthenticated } from 'utils/auth'
import HeaderTemplate from './template'
import Left from './left'
import Logo from './logo'
import Right from './right'

class Header extends Component {
  static defaultProps = {
    category: '',
  }
  static propTypes = {
    fetchPreviews: func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    category: string,
  }
  static cocntextTypes = {
    router: func.isRequired,
  }
  loadNewFeed = () => {
    const { location: { pathname }, fetchPreviews } = this.props
    const category = pathname.replace(/\//, '') || 'humor'
    fetchPreviews(category, 1)
  }
  render() {
    return (
      <Route
        path="*"
        render={() => {
          const currentLocation = this.props.location.pathname
          const pageName = getPageName(currentLocation)
          let logoLinkTo = '/'

          if (pageName === 'detail') {
            logoLinkTo = `/${this.props.category || 'humor'}`
          }

          return (
            requiresHeader(currentLocation) && (
              <HeaderTemplate
                left={
                  <Left
                    pageName={pageName}
                    loggedIn={isAuthenticated()}
                    icon={pageName === 'home' ? LogoutIcon : BackIcon}
                    onClick={pageName === 'home' ? logout : history.goBack}
                  />
                }
                logo={
                  <Logo
                    to={logoLinkTo}
                    onClick={this.loadNewFeed}
                    text={rendersLogoText(currentLocation, this.props.category) || 'All 유머'}
                  />
                }
                right={pageName !== 'search' && <Right />}
                bottom={rendersBottom(currentLocation)}
              />
            )
          )
        }}
      />
    )
  }
}

export default withRouter(
  connect(
    state => ({
      category: articleReducer.getCategory(state),
    }),
    actions,
  )(Header),
)

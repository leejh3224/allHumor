import React, { Component } from 'react'
import { func, arrayOf, shape } from 'prop-types'
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactRouterPropTypes from 'react-router-prop-types'

import * as paginationDucks from 'store/modules/pagination'
import * as articleDucks from 'store/modules/article'
import { MenuIcon, BackIcon } from 'components/icons'
import getPageName from 'utils/getPageName'
import { rendersBottom, requiresHeader, rendersLogoText } from 'layout/utils'
import history from 'utils/history'
import HeaderTemplate from './template'
import Left from './left'
import Logo from './logo'
import Right from './right'

class Header extends Component {
  static propTypes = {
    loadArticles: func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
    articles: arrayOf(shape()).isRequired,
  }
  static cocntextTypes = {
    router: func.isRequired,
  }
  loadNewFeed = () => {
    this.props.loadArticles()
  }
  render() {
    return (
      <Route
        path="*"
        render={() => {
          const currentLocation = this.props.location.pathname
          const { articles } = this.props
          const pageName = getPageName(currentLocation)
          let category

          /* eslint-disable prefer-destructuring */
          if (articles.length && pageName === 'detail') {
            const articleId = this.props.location.pathname.match(/[a-f\d]{24}/i)[0]
            category = articles.filter(article => article._id === articleId)[0].category
          } else {
            category = ''
          }
          return (
            requiresHeader(currentLocation) && (
              <HeaderTemplate
                left={
                  <Left
                    icon={pageName === 'home' ? MenuIcon : BackIcon}
                    onClick={pageName === 'home' ? () => {} : history.goBack}
                  />
                }
                logo={
                  <Logo
                    to={`/${category}`}
                    onClick={this.loadNewFeed}
                    text={rendersLogoText(currentLocation, category)}
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

Header.propTypes = {}

export default withRouter(
  connect(
    state => ({
      articles: articleDucks.getArticles(state),
    }),
    paginationDucks,
  )(Header),
)

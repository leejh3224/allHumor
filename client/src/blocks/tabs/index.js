import React, { Component } from 'react'
import { func } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactRouterPropTypes from 'react-router-prop-types'

import { colors } from 'styles/theme'
import * as paginationDucks from 'store/modules/pagination'
import { WithWindowSize, StickyOnScroll } from 'blocks/render-props'
import getActiveTabIndex from './getActiveTabIndex'
import Base from './base'

class Tabs extends Component {
  static propTypes = {
    loadArticles: func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  }
  state = {
    names: ['humor', 'soccer', 'bitcoin', 'idol'],
  }
  render() {
    const { names } = this.state
    return (
      <StickyOnScroll headerHeight={75}>
        {({ isSticky }) => (
          <WithWindowSize>
            {({ width }) => (
              <div
                css={{
                  width: '100%',
                  backgroundColor: colors.primary,
                  position: isSticky ? 'fixed' : 'static',
                }}
              >
                <Base
                  tabsWidth={width}
                  names={names}
                  activeTabIndex={getActiveTabIndex(names, this.props.location.pathname)}
                  onTabClick={() => this.props.loadArticles()}
                />
              </div>
            )}
          </WithWindowSize>
        )}
      </StickyOnScroll>
    )
  }
}

export default withRouter(connect(null, paginationDucks)(Tabs))

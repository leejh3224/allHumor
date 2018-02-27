import React, { Component } from 'react'
import { func } from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactRouterPropTypes from 'react-router-prop-types'

import * as actions from 'store/previewList/actions'
import { WithWindowSize, StickyOnScroll } from 'blocks/render-props'
import history from 'utils/history'
import getActiveTabIndex from './getActiveTabIndex'
import Base from './base'

class Tabs extends Component {
  static propTypes = {
    fetchPreviews: func.isRequired,
    location: ReactRouterPropTypes.location.isRequired,
  }
  state = {
    names: ['humor', 'soccer', 'bitcoin', 'idol'],
  }
  render() {
    const { names } = this.state
    const { location: { pathname }, fetchPreviews } = this.props

    function onTabClick(event, name) {
      event.preventDefault()
      history.replace(name)
      fetchPreviews(name, 1)
    }

    return (
      <StickyOnScroll headerHeight={75}>
        {({ isSticky }) => (
          <WithWindowSize>
            {({ width }) => (
              <Base
                tabsWidth={width}
                names={names}
                activeTabIndex={getActiveTabIndex(names, pathname)}
                onTabClick={onTabClick}
                isSticky={isSticky}
              />
            )}
          </WithWindowSize>
        )}
      </StickyOnScroll>
    )
  }
}

export default withRouter(connect(null, actions)(Tabs))

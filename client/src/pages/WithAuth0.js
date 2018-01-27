import React, { Component } from 'react'
import { func } from 'prop-types'
import { isAuthenticated, getProfile } from 'utils/auth'

const WithAuth0 = WrappedComponent =>
  class WithState extends Component {
    static propTypes = {
      setUserProfile: func.isRequired,
    }
    componentDidMount() {
      if (isAuthenticated()) {
        getProfile((err, profile) => {
          if (profile) {
            const { picture, name, identities } = profile
            this.props.setUserProfile({
              userId: identities[0].user_id,
              avatar: picture,
              displayName: name,
            })
          }
        })
      }
    }
    componentWillReceiveProps() {
      console.log('path change')
    }
    render() {
      return <WrappedComponent {...this.props} {...this.state} />
    }
  }

export default WithAuth0

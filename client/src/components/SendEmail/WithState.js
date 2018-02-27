import React, { Component } from 'react'
import { func } from 'prop-types'

const WithStateHoc = WrappedComponent =>
  class WithState extends Component {
    static propTypes = {
      sendMagicLink: func.isRequired,
    }
    state = {
      email: '',
      submitError: null,
      isSubmitting: false,
    }
    handleInputChange = e => {
      const { value } = e.target
      this.setState(prev => ({ ...prev, email: value }))
    }
    resetFields = () => {
      this.setState({
        email: '',
        submitError: null,
        isSubmitting: false,
      })
    }
    handleSubmit = async () => {
      const { email } = this.state
      const { sendMagicLink } = this.props

      this.setState(prev => ({ ...prev, isSubmitting: true }))
      sendMagicLink(email, err => {
        if (err) {
          return this.setState(prev => ({
            ...prev,
            submitError: err.code,
            isSubmitting: false,
          }))
        }
        this.resetFields()
        return this.setState(prev => ({
          ...prev,
          submitError: null,
          isSubmitting: false,
        }))
      })
    }
    render() {
      return (
        <WrappedComponent
          {...this.state}
          {...this.props}
          handleInputChange={this.handleInputChange}
          handleSubmit={this.handleSubmit}
        />
      )
    }
  }

export default WithStateHoc

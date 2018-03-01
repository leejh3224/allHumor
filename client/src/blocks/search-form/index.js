import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'

import * as actions from 'store/search/actions'
import { MagnifyingGlassIcon } from 'components/icons'
import { colors, spacing, fonts } from 'styles/theme'

class SearchForm extends Component {
  static propTypes = {
    search: func.isRequired,
  }
  state = {
    keyword: '',
  }
  handleInputChange = event => {
    const { value } = event.target
    this.setState(prev => ({ ...prev, keyword: value }))
  }
  handleSubmit = event => {
    event.preventDefault()
    this.props.search(this.state.keyword)
  }
  render() {
    return (
      <form
        css={{
          display: 'flex',
          flex: 1,
          backgroundColor: colors.primary,
          padding: `${spacing.small}px ${spacing.medium}px`,
          width: '100%',
          position: 'relative',
        }}
        onSubmit={this.handleSubmit}
      >
        <MagnifyingGlassIcon
          color={colors.black}
          cssProps={{
            position: 'absolute',
            top: 21,
            left: 30,
          }}
        />
        <input
          css={{
            flex: 1,
            ...fonts.body,
            height: 56,
            borderRadius: 6,
            textIndent: 50,
            maxHeight: 45,
          }}
          type="text"
          placeholder="검색: 제목, 내용 혹은 작성자"
          onChange={this.handleInputChange}
          value={this.state.keyword}
        />
      </form>
    )
  }
}

SearchForm.propTypes = {}

export default connect(null, actions)(SearchForm)

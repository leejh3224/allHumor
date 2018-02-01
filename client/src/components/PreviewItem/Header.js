import React from 'react'
import { string } from 'prop-types'
import { spacing, fonts } from 'styles/theme'
import WithEllipsis from 'components/WithEllipsis'

const Header = ({ title, author, date }) => (
  <WithEllipsis
    config={[{ className: 'title', maxHeight: 50 }, { className: 'author', maxHeight: 44 }]}
  >
    {() => (
      <div
        css={{
          flex: 1,
        }}
      >
        <div
          key="previewItemTitle"
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: spacing.xsmall,
          }}
        >
          <h1
            className="title"
            css={{
              maxHeight: 50,
              marginTop: 3,
              ...fonts.header,
            }}
          >
            {title}
          </h1>
        </div>
        <div
          key="previewItemAuthorAndDate"
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            flex: 1,
            ...fonts.small,
          }}
        >
          <span className="author">{author}</span>
          <span
            css={{
              minWidth: 65,
              textAlign: 'right',
              marginLeft: spacing.small,
            }}
          >
            {date}
          </span>
        </div>
      </div>
    )}
  </WithEllipsis>
)

Header.propTypes = {
  title: string.isRequired,
  author: string.isRequired,
  date: string.isRequired,
}

export default Header

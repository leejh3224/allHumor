import React from 'react'
import { string } from 'prop-types'
import { fonts, colors } from 'styles/theme'
import WithEllipsis from 'components/WithEllipsis'

const Header = ({ title, author }) => (
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
          }}
        >
          <h1
            className="title"
            css={{
              maxHeight: 50,
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
          <span css={{ color: colors.grey }} className="author">
            {author}
          </span>
        </div>
      </div>
    )}
  </WithEllipsis>
)

Header.propTypes = {
  title: string.isRequired,
  author: string.isRequired,
}

export default Header

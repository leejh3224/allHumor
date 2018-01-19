import React from 'react'
// import PropTypes from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'

const CommentItem = () => (
  <div
    css={{
      display: 'flex',
    }}
  >
    <figure
      css={{
        width: 50,
        height: 50,
        marginRight: spacing.medium,
      }}
    >
      <img
        css={{
          width: 50,
          height: '100%',
          borderRadius: '100%',
        }}
        src={`${process.env.PUBLIC_URL}/images/messi.jpg`}
        alt="아바타"
      />
    </figure>
    <div>
      <p
        css={{
          ...fonts.xsmall,
          fontWeight: 700,
        }}
      >
        I LOVE MESSI
        <span
          css={{
            marginLeft: spacing.small,
            color: colors.grey,
            fontWeight: 400,
          }}
        >
          2시간 전
        </span>
      </p>
      <p
        css={{
          ...fonts.body,
          marginTop: spacing.xsmall,
          marginBottom: spacing.small,
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
        explicabo illo tempora sapiente tempore similique debitis eaque
        temporibus modi quasi.`
      </p>
      <p
        css={{
          ...fonts.xsmall,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        답글 보기{' '}
        <i
          css={{
            marginLeft: spacing.small,
          }}
          className="ion-chevron-down"
        />
      </p>
    </div>
  </div>
)

CommentItem.propTypes = {}

export default CommentItem

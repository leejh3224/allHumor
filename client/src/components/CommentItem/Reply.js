import React from 'react'
import { shape, func, string, bool } from 'prop-types'
import { spacing, fonts, colors } from 'styles/theme'
import formatDate from 'utils/formatDate'
import { AddComment, ActionsList } from 'components'
import WithState from './WithState'

const Reply = ({
  reply,
  toggleExpandComment,
  hideAddComment,
  addComment,
  addReply,
  parentId,
  showAddComment,
  myUserId,
  isMenuVisible,
  handleOpenMenu,
  handleCloseMenu,
}) => {
  const {
    _id,
    userId,
    avatar,
    author,
    createdAt,
    content,
    isTruncated,
    isAddingReply,
  } = reply
  return (
    <div
      css={{
        display: 'flex',
        position: 'relative',
      }}
    >
      <figure
        css={{
          width: 30,
          height: 30,
          marginRight: spacing.small,
        }}
      >
        <img
          css={{
            width: 30,
            height: '100%',
            borderRadius: '100%',
          }}
          src={avatar}
          alt="아바타"
        />
      </figure>
      <div
        css={{
          width: '100%',
        }}
      >
        <p
          css={{
            ...fonts.xsmall,
            fontWeight: 700,
          }}
        >
          {author}
          <span
            css={{
              marginLeft: spacing.small,
              color: colors.grey,
              fontWeight: 400,
            }}
          >
            {formatDate(createdAt)}
          </span>
        </p>
        <div
          css={{
            ...fonts.body,
            marginTop: spacing.xsmall,
            marginBottom: spacing.xsmall,
          }}
        >
          {isTruncated ? (
            <div>
              <p>{content.slice(0, 399)}</p>
              <button
                css={{ ...fonts.xsmall, fontWeight: 500, cursor: 'pointer' }}
                onClick={() => toggleExpandComment(_id)}
              >
                펼치기
              </button>
            </div>
          ) : (
            <div>
              <p css={{ marginBottom: spacing.xsmall }}>{content}</p>
              {content.length >= 400 && (
                <button
                  css={{
                    display: 'block',
                    ...fonts.xsmall,
                    fontWeight: 500,
                    cursor: 'pointer',
                  }}
                  onClick={() => toggleExpandComment(_id)}
                >
                  접기
                </button>
              )}
            </div>
          )}
        </div>
        <button
          css={{
            ...fonts.xsmall,
            cursor: 'pointer',
            color: colors.grey,
            marginBottom: isAddingReply ? spacing.small : 0,
          }}
          onClick={() => showAddComment(_id)}
        >
          답글
        </button>
        {isAddingReply && (
          <AddComment
            addComment={addComment}
            onCancel={() => hideAddComment(_id)}
            parentId={parentId}
            addReply={addReply}
            from={_id}
          />
        )}
      </div>
      {userId === myUserId && (
        <div
          css={{
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <button
            className="button-more"
            css={{
              width: 20,
              height: 30,
              backgroundColor: 'transparent',
              cursor: 'pointer',
              ':hover > .ion-android-more-vertical': {
                color: colors.font,
              },
            }}
            onClick={handleOpenMenu}
          >
            <i
              className="ion-android-more-vertical"
              css={{
                ...fonts.icon,
                color: colors.grey,
              }}
            />
          </button>
          {isMenuVisible && (
            <ActionsList
              actions={['수정', '삭제']}
              handleCloseMenu={handleCloseMenu}
            />
          )}
        </div>
      )}
    </div>
  )
}

Reply.propTypes = {
  reply: shape({}).isRequired,
  toggleExpandComment: func.isRequired,
  hideAddComment: func.isRequired,
  addComment: func.isRequired,
  addReply: func.isRequired,
  parentId: string.isRequired,
  showAddComment: func.isRequired,
  myUserId: string.isRequired,
  isMenuVisible: bool.isRequired,
  handleOpenMenu: func.isRequired,
  handleCloseMenu: func.isRequired,
}

export default WithState(Reply)

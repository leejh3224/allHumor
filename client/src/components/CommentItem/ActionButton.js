import React from 'react'
import { string, func, bool } from 'prop-types'
import { fonts, colors } from 'styles/theme'
import { ActionsList } from 'components'

const ActionButton = ({
  id,
  handleOpenMenu,
  handleCloseMenu,
  isMenuVisible,
  startEditComment,
  removeComment,
}) => (
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
        cursor: 'pointer',
        ':hover > .ion-android-more-vertical': {
          color: colors.font,
        },
      }}
      onClick={isMenuVisible ? handleCloseMenu : handleOpenMenu}
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
        actions={[
          {
            name: '수정',
            onClick: () => startEditComment(id),
          },
          {
            name: '삭제',
            onClick: () => removeComment(id),
          },
        ]}
        handleCloseMenu={handleCloseMenu}
      />
    )}
  </div>
)

ActionButton.propTypes = {
  id: string.isRequired,
  handleOpenMenu: func.isRequired,
  handleCloseMenu: func.isRequired,
  isMenuVisible: bool.isRequired,
  startEditComment: func.isRequired,
  removeComment: func.isRequired,
}

export default ActionButton

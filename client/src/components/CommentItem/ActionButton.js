import React from 'react'
import { arrayOf, shape, func, bool } from 'prop-types'
import { fonts, colors } from 'styles/theme'
import { ActionsList } from 'components'

const ActionButton = ({ isMenuVisible, onClickActionButton, actions }) => (
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
      onClick={onClickActionButton}
    >
      <i
        className="ion-android-more-vertical"
        css={{
          ...fonts.icon,
          color: colors.grey,
        }}
      />
    </button>
    {isMenuVisible && <ActionsList actions={actions} />}
  </div>
)

ActionButton.propTypes = {
  isMenuVisible: bool.isRequired,
  onClickActionButton: func.isRequired,
  actions: arrayOf(shape()).isRequired,
}

export default ActionButton

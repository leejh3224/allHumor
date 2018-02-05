import React from 'react'
import { arrayOf, shape, func, bool, string } from 'prop-types'
import { fonts, lighten } from 'styles/theme'
import ActionsList from './ActionsList'

const ActionButton = ({
  iconColor, isMenuVisible, onClickActionButton, actions,
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
        backgroundColor: 'transparent',
        cursor: 'pointer',
        ':hover > .ion-android-more-vertical': {
          color: iconColor,
        },
      }}
      onClick={onClickActionButton}
    >
      <i
        className="ion-android-more-vertical"
        css={{
          ...fonts.icon,
          color: lighten(iconColor, 0.5),
        }}
      />
    </button>
    {isMenuVisible && <ActionsList actions={actions} />}
  </div>
)

ActionButton.propTypes = {
  iconColor: string.isRequired,
  isMenuVisible: bool.isRequired,
  onClickActionButton: func.isRequired,
  actions: arrayOf(shape()).isRequired,
}

export default ActionButton

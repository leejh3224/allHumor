import React from 'react'
import { arrayOf, shape, func, bool, string } from 'prop-types'
import { fonts, lighten } from 'styles/theme'
import Popup from './popup'

const Base = ({
  iconColor, isVisible, onClickButton, actions,
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
      onClick={onClickButton}
    >
      <i
        className="ion-android-more-vertical"
        css={{
          ...fonts.icon,
          color: lighten(iconColor, 0.5),
        }}
      />
    </button>
    {isVisible && <Popup actions={actions} />}
  </div>
)

Base.propTypes = {
  iconColor: string.isRequired,
  isVisible: bool.isRequired,
  onClickButton: func.isRequired,
  actions: arrayOf(shape()).isRequired,
}

export default Base

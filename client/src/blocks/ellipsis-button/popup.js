import React from 'react'
import { arrayOf, shape } from 'prop-types'
import { spacing, colors, fonts, zIndex } from 'styles/theme'

const Popup = ({ actions }) => (
  <ul
    css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: colors.white,
      position: 'absolute',
      right: 0,
      boxShadow: `0 3px 3px ${colors.grey}, 0 3px 3px ${colors.grey}`,
      padding: `${spacing.small}px 0`,
      zIndex: zIndex.actionsList,
      marginBottom: spacing.small,
    }}
  >
    {actions.map(({ name, onClick }) => {
      const listStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        /* eslint-disable no-mixed-operators */
        width: 18 * name.length + 30,
        padding: spacing.small,
        cursor: 'pointer',
        backgroundColor: colors.white,
        ':hover': {
          backgroundColor: colors.lightGrey,
        },
        ...fonts.small,
        zIndex: zIndex.actionsList,
      }
      return (
        <li css={listStyle} onClick={onClick} onKeyPress={() => {}} role="menuitem" key={name}>
          {name}
        </li>
      )
    })}
  </ul>
)

Popup.propTypes = {
  actions: arrayOf(shape({})).isRequired,
}

export default Popup

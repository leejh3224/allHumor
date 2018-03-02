import { colors, fonts, spacing } from 'styles/theme'

export const primary = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 6,
  backgroundColor: colors.primary,
  ...fonts.header,
  fontWeight: 400,
  color: colors.white,
  cursor: 'pointer',
  boxShadow: `0 2px 6px ${colors.grey}`,
  padding: `${spacing.small}px ${spacing.large}px`,
  outline: 0,

  ':active': {
    transform: 'scale(0.95)',
  },
}

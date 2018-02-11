import { spacing, colors, media } from 'styles/theme'

export default {
  padding: spacing.medium,
  backgroundColor: colors.white,

  [media.greaterThan('medium')]: {
    maxWidth: 800,
    marginRight: 'auto',
    marginLeft: 'auto',
  },

  [media.lessThan('medium')]: {
    padding: spacing.small,
  },
}

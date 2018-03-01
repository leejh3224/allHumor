import { colors } from 'styles/theme'
import { shape, string, func } from 'prop-types'

export const IconDefaultProps = {
  color: colors.white,
  cssProps: undefined,
  onClick: () => {},
}

export const IconPropTypes = {
  color: string,
  cssProps: shape(),
  onClick: func,
}

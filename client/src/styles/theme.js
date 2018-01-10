// import Color from 'color'

const colors = {
  primary: 'hsla(204, 70%, 53%, 1)', // skyblue
  primaryDarker: 'hsla(204, 70%, 23%, 1)',
  divider: 'hsla(0, 0%, 75%, 1)',
  lightGrey: 'hsla(0, 0%, 85%, 1)', // for icon
  lighterGrey: 'hsla(0, 0%, 95%, 1)',
  font: 'hsla(0, 0%, 10%, 1)',
  black: 'hsla(0, 0%, 0%, 1)',
  white: 'hsla(360, 100%, 100%, 1)',
}

const screenSize = {
  small: { min: 0, max: 499 },
  medium: { min: 500, max: 799 },
  mediumLarge: { min: 800, max: 1200 },
}

const media = {
  between(smallKey, largeKey, excludeLarge = false) {
    if (excludeLarge) {
      return `@media (min-width: ${screenSize[smallKey].min}px) and (max-width: ${screenSize[
        largeKey
      ].min - 1}px)`
    }
    if (screenSize[largeKey].max === Infinity) {
      return `@media (min-width: ${screenSize[smallKey].min}px)`
    }
    return `@media (min-width: ${screenSize[smallKey].min}px) and (max-width: ${
      screenSize[largeKey].max
    }px)`
  },
  greaterThan(key) {
    return `@media (min-width: ${screenSize[key].max}px)`
  },
  lessThan(key) {
    return `@media (max-width: ${screenSize[key].min - 1}px)`
  },
}

const fonts = {
  header: {
    fontSize: 22,
    lineHeight: 1.01,
  },
  small: {
    fontSize: 12,
  },
}

const spacing = {
  xsmall: 5,
  small: 10,
  medium: 20,
  large: 40,
  xlarge: 80,
}

export { colors, media, fonts, spacing }

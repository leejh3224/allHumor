// import Color from 'color'

export const lighten = (color, alpha) => {
  const [h, s, l] = color.match(/\d{1,}/g)
  return `hsla(${h}, ${s}%, ${l}%, ${1 - alpha})`
}

const colors = {
  primary: 'hsla(200, 100%, 50%, 1)',
  skyblue: 'hsla(200, 90%, 77%, 1)',
  primaryDarker: 'hsla(204, 70%, 23%, 1)',
  divider: 'hsla(0, 0%, 75%, 1)',
  grey: 'hsla(0, 0%, 55%, 1)', // for icon
  lightGrey: 'hsla(0, 0%, 85%, 1)',
  lighterGrey: 'hsla(0, 0%, 95%, 1)',
  font: 'hsla(0, 0%, 20%, 1)',
  black: 'hsla(0, 0%, 0%, 1)',
  white: 'hsla(360, 100%, 100%, 1)',

  // state
  error: 'hsla(360, 100%, 49%, 1)',
  alert: 'hsla(0, 100%, 64%, 1)',
  success: 'hsla(90, 69%, 72%, 1)',

  // brand
  facebook: 'hsla(221, 44%, 42%, 1)',
  twitter: 'hsla(205, 65%, 62%, 1)',
  google: 'hsla(2, 73%, 59%, 1)',
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
  xlarge: {
    fontSize: 55,
  },
  large: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: '140%',
  },
  icon: {
    fontSize: 28,

    [media.lessThan('medium')]: {
      fontSize: 26,
    },
  },
  header: {
    fontSize: 22,
    fontWeight: 700,
    lineHeight: '140%',

    [media.between('medium', 'mediumLarge')]: {
      fontSize: 20,
    },
    [media.lessThan('medium')]: {
      fontSize: 18,
    },
  },
  body: {
    fontSize: 16,
    lineHeight: '140%',
  },
  small: {
    fontSize: 14,
    fontWeight: 400,
  },
  xsmall: {
    fontSize: 13,
  },
}

const spacing = {
  xsmall: 5,
  small: 10,
  medium: 20,
  large: 40,
  xlarge: 80,
}

const zIndex = {
  categoryGroup: 10,
  actionsList: 7,
}

export { colors, media, fonts, spacing, zIndex }

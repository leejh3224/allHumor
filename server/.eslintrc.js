module.exports = {
  extends: 'airbnb-base',
  parser: 'babel-eslint',
  rules: {
    semi: 0,
    'no-underscore-dangle': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
  },
  env: {
    jest: true,
    node: true,
  },
}

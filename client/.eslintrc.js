module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  rules: {
    semi: 0,
    'no-underscore-dangle': 0,

    // import
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
    'import/prefer-default-export': 0,

    // react
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/no-typos': 0,
    'react/no-danger': 0,
    'jsx-a11y/anchor-is-valid': 0,

    // to stop prettier to emit errors
    'arrow-parens': 0,
    'function-paren-newline': 0,
  },
  env: {
    browser: true,
    jest: true,
    es6: true,
  },
}

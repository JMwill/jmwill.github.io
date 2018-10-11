module.exports = {
    parser: 'babel-eslint',
    env: {
      browser: true,
    },
    extends: ['standard'],
    root: true,
    rules: {
      camelcase: 0,
      eqeqeq: 0,
      'max-len': ['error', 120],
      'comma-dangle': ['error', 'always-multiline'],
      'space-before-function-paren': ['error', 'never'],
      'object-curly-spacing': ['error', 'never'],
    },
  }

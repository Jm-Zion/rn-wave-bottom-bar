module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native-community',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'max-len': ['error', { code: 80, ignoreUrls: true }],
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  env: {
    node: true,
    es6: true,
  },
};

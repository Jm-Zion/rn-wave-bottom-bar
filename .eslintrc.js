module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/quotes': [
      1,
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    'max-len': ['error', { code: 80, ignoreUrls: true }],
    'prettier/prettier': ['error', { singleQuote: true }],
    '@typescript-eslint/explicit-function-return-type': 'off',
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {
        '@typescript-eslint/quotes': [
          1,
          'double',
          {
            allowTemplateLiterals: true,
          },
        ],
      },
    },
  ],
  env: {
    node: true,
    es6: true,
  },
};

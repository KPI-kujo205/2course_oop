module.exports = {
  extends: [
    'eslint:recommended',
    '@electron-toolkit/eslint-config-ts/recommended',
    '@electron-toolkit/eslint-config-prettier'
  ],
  rules: {
    '@typescript-eslint/explicit-function-return-type': ['off', { allowExpressions: true }],
    '@typescript-eslint/no-unused-vars': ['off', { allowExpressions: true }]
  }
}

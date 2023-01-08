module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['import', 'unused-imports'],
  rules: {
    'newline-before-return': 'error',
    'no-console': 'warn',
    'no-var': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports-ts': 'warn',
    'sort-imports': 0,
    'import/order': 'warn',
  },
}

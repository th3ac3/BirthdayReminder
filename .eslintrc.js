module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    curly: 'off',
    'no-shadow': 'off',
    'react-native/no-inline-styles': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};

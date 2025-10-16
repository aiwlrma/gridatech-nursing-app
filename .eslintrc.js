module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
  ],
  rules: {
    // 기본 규칙만 사용
    'no-trailing-spaces': 'off',
    'comma-dangle': 'off',
    'curly': 'off',
    'react/jsx-no-bind': 'off',
    'react/no-array-index-key': 'off',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
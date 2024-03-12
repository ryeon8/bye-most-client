module.exports = {
  env: {
    node: true,
    browser: true,
    es2021: true
  },
  parser: '@babel/eslint-parser',
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ['react'],
  rules: {
    'prettier/prettier': 'off'
  }
}

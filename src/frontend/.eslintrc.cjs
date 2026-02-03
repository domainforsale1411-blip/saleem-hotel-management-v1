module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "max-lines": ["error", 300],
    "complexity": ["error", 10],
    "no-console": "error",
    "camelcase": ["error", {"properties": "always"}],
    "consistent-return": "error",
    "eqeqeq": ["error", "always"],
    "no-magic-numbers": ["error", {"ignore": [0, 1, 7, 24, 30, 365]}]
  },
}

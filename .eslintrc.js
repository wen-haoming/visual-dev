const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  rules: {
    'no-param-reassign': 0,
  },
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
});

const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  parserOptions: {
    tsconfigRootDir:__dirname,
    sourceType: 'module',
    ecmaVersion: 2020
  },
  // rules: {
  //   'node/no-unsupported-features/es-syntax': 'off',
  //   '@typescript-eslint/no-unused-vars': 'off', // maybe we should turn this on in a new PR
  //   'node/no-missing-import': [
  //     'error',
  //     {
  //       allowModules: ['types', 'estree', 'testUtils', 'stylus'],
  //       tryExtensions: ['.ts', '.js', '.jsx', '.tsx', '.d.ts']
  //     }
  //   ],
  // },
  // parserOptions: {
  //   sourceType: 'module',
  //   ecmaVersion: 2020
  // },
  extends: [
    require.resolve('@umijs/fabric/dist/eslint'),

  ]
})

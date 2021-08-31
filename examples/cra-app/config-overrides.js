const { override, addWebpackPlugin } = require('customize-cra')
const WebpackDevToolPLugin = require('@web-devtools/webpack').default

module.exports = override(addWebpackPlugin(new WebpackDevToolPLugin()))

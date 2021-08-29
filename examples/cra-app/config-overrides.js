const { override, addWebpackPlugin } = require('customize-cra')
const WebpackDevToolPLugin = require('../../packages/webpack-devtool-plugin').default

module.exports = override(addWebpackPlugin(new WebpackDevToolPLugin({injectFile:false})))

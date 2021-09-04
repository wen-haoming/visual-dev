const { override, addWebpackPlugin } = require('customize-cra')
const WebpackDevToolPLugin = require('../../packages/webpack').default


module.exports = override(addWebpackPlugin(new WebpackDevToolPLugin({injeceFile:false})))

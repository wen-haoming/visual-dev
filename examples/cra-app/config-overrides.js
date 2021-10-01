const { override, addWebpackPlugin } = require('customize-cra')
// const WebpackDevToolPLugin = require('visual-dev/webpack').default
const WebpackDevToolPLugin = require('../../packages/visual-dev/dist/plugins/webpack').default


module.exports = override(addWebpackPlugin(new WebpackDevToolPLugin({
    resolve:{
        includes:['components']
    },
    injectFile:false
})))

const { override, addWebpackPlugin } = require('customize-cra')
const WebpackDevToolPLugin = require('visual-dev/webpack').default


module.exports = override(addWebpackPlugin(new WebpackDevToolPLugin({
    resolve:{
        includes:['components']
    }
})))

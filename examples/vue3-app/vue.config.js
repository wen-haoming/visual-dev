// const WebpackDevToolPLugin = require('visual-dev/plugins/webpack').default
const WebpackDevToolPLugin = require('visual-dev/plugins/webpack').default

module.exports = {
    configureWebpack: {
      plugins: [
        new WebpackDevToolPLugin({
          injectFile:false
        })
      ]
    }
}
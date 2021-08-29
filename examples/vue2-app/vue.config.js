const WebpackDevToolPLugin = require('../../packages/webpack-devtool-plugin/dist').default

module.exports = {
    configureWebpack: {
      plugins: [
        new WebpackDevToolPLugin({
            injectFile:false
        })
      ]
    }
  }
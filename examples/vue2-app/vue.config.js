const WebpackDevToolPLugin = require('../../packages/webpack-devtool-plugin').default

module.exports = {
    configureWebpack: {
      plugins: [
        new WebpackDevToolPLugin()
      ]
    }
  }
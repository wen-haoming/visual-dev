const WebpackDevToolPLugin = require('@web-devtools/webpack').default

module.exports = {
    configureWebpack: {
      plugins: [
        new WebpackDevToolPLugin()
      ]
    }
  }
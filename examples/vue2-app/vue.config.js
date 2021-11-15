const WebpackDevToolPLugin = require('../../packages/visual-dev/plugins/webpack').default

module.exports = {
    configureWebpack: {
      plugins: [
        new WebpackDevToolPLugin({
          injectFile:false
        })
      ]
    }
  }
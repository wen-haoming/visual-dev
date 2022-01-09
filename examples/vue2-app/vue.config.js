// const WebpackDevToolPLugin = require('visual-dev/plugins/webpack').default
const WebpackDevToolPLugin = require('../../packages/visual-dev/plugins/webpack').default

module.exports = {
  devServer: {
    proxy: WebpackDevToolPLugin.proxy({
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    })
  },
    configureWebpack: {
      plugins: [
        new WebpackDevToolPLugin({
          injectFile:false
        })
      ]
    }
}
const path = require('path')
const fs = require('fs-extra')

const resolve = (str) => path.resolve(__dirname, str)

fs.move(
  resolve('../packages/dev-ui/dist'),
  resolve('../packages/webpack-devtool-plugin/dev-ui'),
  (err) => {
    if (err) return console.error(err)
    console.log('success!')
  }
)

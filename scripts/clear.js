const path = require('path')
const fs = require('fs-extra')

const resolve = (str) => path.resolve(__dirname, str)

fs.removeSync(resolve('../packages/core/dist'))
fs.removeSync(resolve('../packages/dev-ui/dist'))
fs.removeSync(resolve('../packages/webpack/dist'))
fs.removeSync(resolve('../packages/webpack/dev-ui'))
fs.removeSync(resolve('../packages/umi/dev-ui'))
fs.removeSync(resolve('../packages/umi/dist'))

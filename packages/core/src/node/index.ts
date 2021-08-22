import path from 'path'

export { httpProxy } from './src/httpProxy'
export { createSocketServe } from './src/createSocketServe'
export { createServer } from './src/createServer'
export { insertJSXElementPathPlugin, insertParametersPlugin } from './src/babel'
export { ASSETS_DIR } from '../client/vite.config'
export { DEV_SERVER_PORT } from '../client/src/config'
export const CLIENT_ASSETS_DIR = path.resolve(__dirname, '../client')

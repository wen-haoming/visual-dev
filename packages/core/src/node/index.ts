import path from 'path'

export { httpProxy } from './src/httpProxy'
export { createSocketServe } from './src/createSocketServe'
export { createServer } from './src/createServer'
export { insertJSXElementPathPlugin, insertParametersPlugin } from './src/babel'
export { ASSETS_DIR } from '../client/vite.config'
export const CLIENT_ASSETS_DIR = path.resolve(__dirname, '../client')

export const DEV_SERVER_PORT = 10010

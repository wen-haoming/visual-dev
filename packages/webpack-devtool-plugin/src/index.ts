import type { Compiler, Plugin } from 'webpack'
import { mergeLoaderOption } from './loader'
import writeAndCopy from './writeAndCopy'
import { createServer, DEV_SERVER_PORT } from '@web-devtools/core'

export interface Options {
  injectFile?: boolean
}

const defaultOptions = {
  injectFile: true
}

const WebpackDevtoolPlugin: Plugin = class {
  public options: Options

  constructor(options?: Options) {
    this.options = options || defaultOptions
  }
  apply(compiler: Compiler) {
    compiler.hooks.afterPlugins.tap('mergeLoaderOption', mergeLoaderOption)

    if (this.options.injectFile) {
      compiler.hooks.emit.tap('writeFileAndCopyFile', writeAndCopy)
    }

    compiler.hooks.environment.tap('createServer', () => {
      createServer({
        port: DEV_SERVER_PORT
      })
    })
  }
}

export default WebpackDevtoolPlugin

import type { Compiler, Plugin } from 'webpack'
import { mergeLoaderOption } from './loader'
import writeAndCopy from './writeAndCopy'
import { createServer, DEV_SERVER_PORT } from '@web-devtool/core'

const WebpackDevtoolPlugin: Plugin = class {
  public option: any

  constructor(option: any) {
    this.option = option
  }
  apply(compiler: Compiler) {
    compiler.hooks.afterPlugins.tap('mergeLoaderOption', mergeLoaderOption)
    compiler.hooks.emit.tap('writeFileAndCopyFile', writeAndCopy)
    compiler.hooks.environment.tap('createServer', () => {
      createServer({
        port: DEV_SERVER_PORT
      })
    })
  }
}

export default WebpackDevtoolPlugin

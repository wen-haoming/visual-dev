import type { Compiler, Plugin } from 'webpack'
import { mergeLoaderOption } from './loader'
import writeAndCopy from './writeAndCopy'

const WebpackDevtoolPlugin: Plugin = class {
  public option: any

  constructor(option: any) {
    this.option = option
  }
  apply(compiler: Compiler) {
    compiler.hooks.afterPlugins.tap('mergeLoaderOption', mergeLoaderOption)
    compiler.hooks.emit.tap('writeFileAndCopyFile', writeAndCopy)
  }
}

export default WebpackDevtoolPlugin

import { merge } from 'webpack-merge'
import type { Compiler } from 'webpack'
import path from 'path'

class WebpackDevtoolPlugin {
  public userOptions: any

  constructor(option: any) {
    this.userOptions = option
  }
  apply(compiler: Compiler) {
    // eslint-disable-next-line no-param-reassign
    const newOpt = merge(compiler.options, {
      resolveLoader: {
        alias: {
          'devtool-loader': path.resolve(__dirname, './devtool-loader')
        }
      },
      module: {
        rules: [
          {
            test: /\.(j|t)sx$/,
            use: {
              loader: 'devtool-loader'
            }
          }
        ]
      }
    } as typeof compiler.options)

    Object.assign(compiler.options, newOpt)
  }
}

export default WebpackDevtoolPlugin

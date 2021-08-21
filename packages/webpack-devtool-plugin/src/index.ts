import { merge } from 'webpack-merge'
import type { Compiler, Plugin } from 'webpack'
import { CLIENT_ASSETS_DIR, ASSETS_DIR } from '@web-devtool/core'
import path from 'path'
import fs from 'fs'

const WebpackDevtoolPlugin: Plugin = class {
  public userOptions: any

  constructor(option: any) {
    this.userOptions = option
  }
  apply(compiler: Compiler) {
    const newOpt = merge(compiler.options, {
      module: {
        rules: [
          {
            test: /\.(j|t)sx?$/,
            use: {
              loader: path.resolve(__dirname, './devtool-loader/index.js')
            }
          }
        ]
      }
    } as typeof compiler.options)

    Object.assign(compiler.options, newOpt)

    // Called after setting up initial set of internal plugins.
    compiler.hooks.afterPlugins.tap('afterPlugins', (compiler2: Compiler) => {
      compiler2.hooks.emit.tap('writeFileAndCopyFile', (compilation) => {
        // const rootPath = path.resolve("./lib");
        const mathchHtmlFile = Object.keys(compilation.assets).filter(
          (filePath) => /\.html$/.test(filePath)
        )

        mathchHtmlFile.forEach((filePath) => {
          let htmlContent = compilation.assets['index.html'].source()

          // eslint-disable-next-line no-param-reassign
          compilation.assets[filePath] = {
            source() {
              htmlContent = htmlContent.replace(
                /<body>([\s\S]*)<\/body>/g,
                ($1, $2) => {
                  return (
                    fs.readFileSync(
                      `${CLIENT_ASSETS_DIR}/index.html`,
                      'utf-8'
                    ) + $2
                  )
                }
              )
              return htmlContent
            },
            size() {
              return htmlContent.length
            }
          }
        })

        // copy file
        const assetsDir = `${CLIENT_ASSETS_DIR}/${ASSETS_DIR}`

        const dirs = fs.readdirSync(assetsDir)

        dirs.forEach((fileName) => {
          const content = fs.readFileSync(`${assetsDir}/${fileName}`, 'utf-8')
          // eslint-disable-next-line no-param-reassign
          compilation.assets[`${ASSETS_DIR}/${fileName}`] = {
            source() {
              return content
            },
            size() {
              return content.length
            }
          }
        })
      })
    })
  }
}

export default WebpackDevtoolPlugin

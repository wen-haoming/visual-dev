import fs from 'fs'
import path from 'path'
import type { Compiler } from 'webpack'

const staticDir = 'assets'
const assetsDir = path.resolve(__dirname, `../dev-ui/${staticDir}`)

export default class {
  apply(compiler: Compiler) {
    compiler.hooks.emit.tap('writeFileAndCopyFile', (compilation: any) => {
      // copy file
      const dirs = fs.readdirSync(assetsDir)

      dirs.forEach((fileName) => {
        const content = fs.readFileSync(`${assetsDir}/${fileName}`, 'utf-8')
        // eslint-disable-next-line no-param-reassign
        compilation.assets[`${staticDir}/${fileName}`] = {
          source() {
            return content
          },
          size() {
            return content.length
          }
        }
      })
    })
  }
}

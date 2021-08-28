import { parse } from '@babel/parser'
import { transformFromAst } from '@babel/core'
import {
  insertParametersPlugin,
  insertJSXElementPathPlugin
} from '@web-devtool/core'
import { loader, Compiler } from 'webpack'
import path from 'path'

const devtoolLoader: loader.Loader = function webpackLoader(this, source) {
  const { rootContext: rootPath, resourcePath: filePath } = this
  // const options: any = getOptions(this)
  const ast = parse(source.toString(), {
    sourceType: 'unambiguous',
    allowUndeclaredExports: true,
    allowImportExportEverywhere: true,
    plugins: [
      'typescript',
      'jsx'
      // ...(options?.babelPlugins ?? [])
    ]
    // ...options?.babelOptions
  })
  // console.log(filePath)
  const { code } = transformFromAst(ast as any, source.toString(), {
    plugins: [insertParametersPlugin, insertJSXElementPathPlugin],
    filename: filePath,
    filenameRelative: rootPath
  })
  return code
}

export const mergeLoaderOption = (compiler: Compiler) => {
  compiler.options.module?.rules.unshift(
    ...[
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: path.resolve(__dirname, './loader.js')
        }
      }
    ]
  )
}

export default devtoolLoader

import { parse } from '@babel/parser'
import { transformFromAst } from '@babel/core'
import {
  insertParametersPlugin,
  insertJSXElementPathPlugin
} from '@web-devtool/core'
import type { loader } from 'webpack'

const webpackLoader: loader.Loader = function webpackLoader(this, source) {
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
  const { code } = transformFromAst(ast as any, source.toString(), {
    plugins: [insertParametersPlugin, insertJSXElementPathPlugin],
    filename: filePath,
    filenameRelative: rootPath
  })
  return code
}

export default webpackLoader

import { parse } from '@babel/parser'
import { transformFromAst } from '@babel/core'
import insertParametersPlugin from './babel/insertParametersPlugin'

export default function (source: string) {
  // const { rootContext: rootPath, resourcePath: filePath } = this
  // eslint-disable-next-line @typescript-eslint/no-invalid-this
  // const options: any = getOptions(this)
  const ast = parse(source, {
    sourceType: 'unambiguous',
    allowUndeclaredExports: true,
    allowImportExportEverywhere: true,
    plugins: [
      'typescript',
      'jsx',
      'decorators-legacy',
      'classProperties'
      // ...(options?.babelPlugins ?? [])
    ]
    // ...options?.babelOptions
  })

  const { code } = transformFromAst(ast, source, {
    plugins: [insertParametersPlugin]
  })
  return code
}

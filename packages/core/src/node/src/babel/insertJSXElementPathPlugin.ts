import type { PluginObj } from '@babel/core'
import { jsxIdentifier, jsxAttribute, stringLiteral } from '@babel/types'

export const insertJSXElementPathPlugin = (): PluginObj => {
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        const { line, column } = path.node.loc.start
        const relativePath: any = jsxAttribute(
          jsxIdentifier('__p'),
          stringLiteral(
            `${state.filename.replace(
              process.cwd(),
              ''
            )}:${line.toString()}:${column.toString()}`
          )
        )
        path.node.attributes.unshift(relativePath)
      }
    }
  }
}

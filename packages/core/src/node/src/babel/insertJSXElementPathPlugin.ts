import { PluginObj } from '@babel/core'
import { jsxIdentifier, jsxAttribute, stringLiteral } from '@babel/types'

export const insertJSXElementPathPlugin = (): PluginObj => {
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        if (state.filename.match(/node_modules/g)) return

        const { line, column } = path.node.loc.start

        const relativePath: any = jsxAttribute(
          jsxIdentifier('dev-tool-relative-path'),
          stringLiteral(
            `${state.filename}:${line.toString()}:${column.toString()}`
          )
        )
        path.node.attributes.unshift(relativePath)
      }
    }
  }
}

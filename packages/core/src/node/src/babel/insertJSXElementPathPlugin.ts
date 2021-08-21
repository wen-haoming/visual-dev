import type { PluginObj } from '@babel/core'
import { jsxIdentifier, jsxAttribute, stringLiteral } from '@babel/types'
// import type { JSXAttribute, JSXOpeninJSXgElement } from '@babel/types'

export const insertJSXElementPathPlugin = (): PluginObj => {
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        if (state.filename.match(/node_modules/g)) return

        const { line, column } = path.node.loc.start

        const lineAttr = jsxAttribute(
          jsxIdentifier('dev-tool-line'),
          stringLiteral(line.toString())
        )

        const columnAttr = jsxAttribute(
          jsxIdentifier('dev-tool-column'),
          stringLiteral(column.toString())
        )
        const relativePath = jsxAttribute(
          jsxIdentifier('dev-tool-relative-path'),
          stringLiteral(state.filename.toString())
        )

        const attributes: any[] = [lineAttr, columnAttr, relativePath]

        path.node.attributes.unshift(...attributes)
      }
    }
  }
}

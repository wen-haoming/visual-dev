import type { PluginObj } from '@babel/core'
import { jsxIdentifier, jsxAttribute, stringLiteral } from '@babel/types'
import type { JSXAttribute } from '@babel/types'

export const insertJSXElementPathPlugin = (): PluginObj => {
  return {
    visitor: {
      JSXOpeningElement(path, state) {
        if (state.filename.match(/node_modules/g)) return

        const { line, column } = path.node.loc.start

        const lineAttr: JSXAttribute = jsxAttribute(
          jsxIdentifier('dev-tool-line'),
          stringLiteral(line.toString())
        )

        const columnAttr: JSXAttribute = jsxAttribute(
          jsxIdentifier('dev-tool-column'),
          stringLiteral(column.toString())
        )
        const relativePathAttr: JSXAttribute = jsxAttribute(
          jsxIdentifier('deb-tool-relative-path'),
          stringLiteral(state.filename.toString())
        )

        const attributes: JSXAttribute[] = [
          lineAttr,
          columnAttr,
          relativePathAttr
        ]

        path.node.attributes.unshift(...attributes)
      }
    }
  }
}

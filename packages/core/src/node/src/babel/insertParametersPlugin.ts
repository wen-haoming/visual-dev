import generate from '@babel/generator'
import type { PluginObj } from '@babel/core'

const targetCalleeName = ['log', 'info', 'error', 'debug'].map(
  (item) => `console.${item}`
)

export const insertParametersPlugin = ({ types, template }): PluginObj => {
  return {
    visitor: {
      CallExpression(path, state) {
        if ((path.node as any).isNew) {
          return
        }
        const calleeName = generate(path.node.callee).code

        if (targetCalleeName.includes(calleeName)) {
          const { line, column } = path.node.loc.start
          const newNode = template.expression(
            `console.log("${
              state.filename || 'unkown filename'
            }: (${line}, ${column})")`
          )()
          newNode.isNew = true
          if (path.findParent((nodePath) => nodePath.isJSXElement())) {
            path.replaceWith(types.arrayExpression([newNode, path.node]))
            path.skip()
          } else {
            path.insertBefore(newNode)
          }
        }
      }
    }
  }
}

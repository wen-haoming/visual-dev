import type { Visitor } from '@babel/core';
import { jsxIdentifier, jsxAttribute, stringLiteral } from '@babel/types';

export const insertJSXElementPathPlugin = (): { visitor: Visitor } => {
  return {
    visitor: {
      JSXOpeningElement: {
        enter(path, state) {
          const filePath = state?.file?.opts?.filename;

          if (filePath.match(/node_modules/g) || !filePath) return;

          const { line, column } = path.node.loc?.start || { line: 0, column: 0 };

          const relativePath: any = jsxAttribute(
            jsxIdentifier('__p'),
            stringLiteral(
              `${state.filename.replace(
                process.cwd(),
                '',
              )}:${line.toString()}:${column.toString()}`,
            ),
          );

          (path.node as any).attributes.unshift(relativePath);
        },
      },
    },
  };
};

export default insertJSXElementPathPlugin;

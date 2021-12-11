import type { Visitor } from '@babel/core';
import { jsxIdentifier, jsxAttribute, stringLiteral } from '@babel/types';
import { uid } from '../utils/uid';

export const pathMap: Record<string, string> = {};

export const insertJSXElementPathPlugin = (): { visitor: Visitor } => {
  return {
    visitor: {
      JSXOpeningElement: {
        enter(path, state) {
          const filePath = state?.file?.opts?.filename;

          if (filePath.match(/node_modules/g) || !filePath) return;
          let componentName = ((path.node as any)?.name?.name || '') as string;

          if (!/^[A-Z]/.test(componentName)) {
            componentName = '';
          } else {
            componentName = `:${componentName}`;
          }

          const { line, column } = path.node.loc?.start || { line: 0, column: 0 };

          const val = uid(6);

          const relativePath: any = jsxAttribute(jsxIdentifier(`_p`), stringLiteral(val));
          const pathVal = `${state.filename.replace(
            process.cwd(),
            '',
          )}:${line.toString()}:${column.toString()}${componentName}`;

          if (!pathMap[val]) {
            pathMap[val] = pathVal;
          } else {
            pathMap[uid(6)] = pathVal;
          }

          (path.node as any).attributes.push(relativePath);
        },
      },
    },
  };
};

export default insertJSXElementPathPlugin;

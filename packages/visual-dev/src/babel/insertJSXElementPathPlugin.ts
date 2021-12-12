import type { Visitor } from '@babel/core';
import { jsxIdentifier, jsxAttribute, stringLiteral } from '@babel/types';

export const pathMap: Record<string, { path: string; componentName: string; frame: string }> = {};

export const insertJSXElementPathPlugin = (): { visitor: Visitor } => {
  return {
    visitor: {
      JSXOpeningElement: {
        enter(path, state) {
          const filePath = state?.file?.opts?.filename;

          if (filePath.match(/node_modules/g) || !filePath) return;
          const componentName = ((path.node as any)?.name?.name || '') as string;

          const { line, column } = path.node.loc?.start || { line: 0, column: 0 };

          const absolutePath = `${state.filename}:${line.toString()}:${column.toString()}`;

          const relativePath = `${absolutePath.replace(process.cwd(), '')}`;

          const attr: any = jsxAttribute(
            jsxIdentifier(`data-v-p`),
            stringLiteral(`${absolutePath}|${relativePath}|${componentName}|react`),
          );

          (path.node as any).attributes.push(attr);
        },
      },
    },
  };
};

export default insertJSXElementPathPlugin;

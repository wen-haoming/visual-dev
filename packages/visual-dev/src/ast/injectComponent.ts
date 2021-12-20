import * as t from '@babel/types';
import type { Visitor } from '@babel/core';
import template from '@babel/template';

interface Props {
  componentIdentifier: string;
  moduleStringLiteral: string;
  column: number;
  line: number;
}

export const injectCoponent = (props: Props): (() => { visitor: Visitor }) => {
  const { componentIdentifier, moduleStringLiteral, column, line } = props;

  return () => ({
    visitor: {
      Program(path) {
        const { body } = path.node;

        const importDeclaration = body.filter((itemNode) => t.isImportDeclaration(itemNode));

        let targetIndex = importDeclaration.findIndex(
          (itemNode) =>
            t.isImportDeclaration(itemNode) && itemNode.source.value === moduleStringLiteral,
        );

        if (targetIndex === -1) {
          // 不存在就增加module
          targetIndex = importDeclaration.length;

          body.splice(
            targetIndex,
            0,
            t.importDeclaration(
              [
                t.importSpecifier(
                  t.identifier(componentIdentifier),
                  t.identifier(componentIdentifier),
                ),
              ],
              t.stringLiteral(moduleStringLiteral),
            ) as any,
          );
        } else {
          // 存在就增加
          const targetNode: any = body[targetIndex];
          // 检查是否有已经引用过的 组件进来
          const componentIdentifierIndex = targetNode.specifiers.findIndex(
            (node: any) =>
              t.isImportSpecifier(node) && (node.imported as any).name === componentIdentifier,
          );

          if (componentIdentifierIndex === -1) {
            // 引了这个库，但是没用过
            targetNode.specifiers.push(
              t.importSpecifier(
                t.identifier(componentIdentifier),
                t.identifier(componentIdentifier),
              ),
            );
          } else {
            // 用过就不管
          }
        }
      },
      JSXOpeningElement: {
        enter(path) {
          const { line: currentLine, column: currentColumn } = path.node.loc?.start || {
            line: 0,
            column: 0,
          };
          if (line === currentLine && currentColumn === column) {
            const parentNode: any = path.parent;
            if (parentNode && parentNode.children) {
              const newNode = template(
                `<${componentIdentifier}>${componentIdentifier}</${componentIdentifier}>`,
                {
                  sourceType: 'module',
                  allowImportExportEverywhere: true,
                  plugins: ['typescript', 'jsx'],
                },
              )();
              parentNode.children.unshift(newNode);
            }
          }
        },
      },
    },
  });
};

import type { Visitor } from '@babel/core';
import * as t from '@babel/types';

interface Props {
  componentIdentifier: string;
  moduleStringLiteral: string;
}

// function addImport(node: any, id: string) {
//   const { body } = node;
//   const lastImportSit = findLastIndex(body, (item: any) => t.isImportDeclaration(item));

//   const newImport = t.importDeclaration(
//     [t.importSpecifier(t.identifier(id), t.identifier(id))],
//     t.stringLiteral('antd'),
//   );

//   body.splice(lastImportSit + 1, 0, newImport);
// }

export const injectCoponent = (props: Props): { visitor: Visitor } => {
  const { componentIdentifier, moduleStringLiteral } = props;

  return {
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
        } else {
          // 存在就增加
          const targetNode: any = body[targetIndex];
          // 检查是否有已经引用过的 组件进来
          const componentIdentifierIndex = targetNode.specifiers.findIndex(
            (node: any) =>
              t.isImportSpecifier(node) && t.importDeclaration.name === componentIdentifier,
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
    },
  };
};

// {
//     Program(path) {
//       addImport(path.node, component);
//     },
//     ImportSpecifier(path) {
//       const { node } = path;
//       if (t.isImportSpecifier(path.node) && t.isIdentifier(node)) {
//         if (node.imported.name === 'antd') {

//         }
//       }
//     },
//     JSXOpeningElement: {
//       enter(path) {
//         const { line: currentLine, column: currentColumn } = path.node.loc?.start || {
//           line: 0,
//           column: 0,
//         };
//         if (line === currentLine && currentColumn === column) {
//           const parentNode: any = path.parent;
//           if (parentNode && parentNode.children) {
//             const newNode = template(`<${component}>1111</${component}>`, {
//               sourceType: 'module',
//               allowImportExportEverywhere: true,
//               plugins: ['typescript', 'jsx'],
//             })();
//             parentNode.children.unshift(newNode);
//           }
//         }
//       },
//     },
//   }

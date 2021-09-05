import express, { json } from 'express';
import fs from 'fs-extra';
import cors from 'cors';
import launchEditor from '@umijs/launch-editor';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import template from '@babel/template';
import * as t from '@babel/types';
import { SERVER_PORT } from './index';
import generate from '@babel/generator';
import { parsePath } from './utils';
import { findLastIndex } from 'lodash';

function addImport(node: any, id: string) {
  const { body } = node;
  const lastImportSit = findLastIndex(body, (item: any) => t.isImportDeclaration(item));
  const newImport = t.importDeclaration(
    [t.importSpecifier(t.identifier(id), t.identifier(id))],
    t.stringLiteral('antd'),
  );
  body.splice(lastImportSit + 1, 0, newImport);
}

export const createServer = () => {
  const app = express();

  app.use(cors());
  // @ts-ignore
  app.use(json());

  app.post('/web-devtools/launchEditor', async (req, res) => {
    await launchEditor(process.cwd() + req.body.filePath);
    res.send('ok');
  });

  app.post('/web-devtools/injectFile', (req, res) => {
    const { filePath, column, line } = parsePath(req.body.filePath);
    let { component } = req.body as { component: string; componentType?: string };
    component = component.replace(/^./, ($1) => $1.toUpperCase());

    const absPath = process.cwd() + filePath;
    if (!fs.existsSync(absPath)) return;

    const file = fs.readFileSync(absPath, 'utf-8');

    const ast = parse(file, {
      sourceType: 'unambiguous',
      allowUndeclaredExports: true,
      allowImportExportEverywhere: true,
      plugins: ['typescript', 'jsx'],
    });

    traverse(ast as any, {
      Program(path) {
        addImport(path.node, component);
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
              const newNode = template(`<${component}>1111</${component}>`, {
                sourceType: 'module',
                allowImportExportEverywhere: true,
                plugins: ['typescript', 'jsx'],
              })();
              parentNode.children.unshift(newNode);
            }
          }
        },
      },
    });

    const { code } = generate(ast as any);
    fs.writeFileSync(absPath, code);

    res.send('ok');
  });

  app.listen(SERVER_PORT, () => {
    // eslint-disable-next-line
    console.log(`dev-plugin is listening ${SERVER_PORT}`);
  });
};

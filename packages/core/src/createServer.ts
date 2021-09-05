import express, { json } from 'express';
import fs from 'fs-extra';
import cors from 'cors';
import launchEditor from '@umijs/launch-editor';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import template from '@babel/template';
import { SERVER_PORT } from './index';
import generate from '@babel/generator';
import { parsePath } from './utils';

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
      JSXOpeningElement: {
        enter(path) {
          const { line: currentLine, column: currentColumn } = path.node.loc?.start || {
            line: 0,
            column: 0,
          };
          if (line === currentLine && currentColumn === column) {
            const parentNode: any = path.parent;
            if (parentNode && parentNode.children) {
              const newNode = template(`<h1>1111</h1>`, {
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

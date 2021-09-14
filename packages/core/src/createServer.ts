import express, { json } from 'express';
import fs from 'fs-extra';
import cors from 'cors';
import launchEditor from '@umijs/launch-editor';
import { parse } from '@babel/parser';
import { transformFromAst } from '@babel/core';
import { SERVER_PORT } from './index';
import { parsePath } from './utils';
import { injectCoponent } from './babel';

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

    const { code = '' } = transformFromAst(ast as any, file, {
      plugins: [
        injectCoponent({
          componentIdentifier: component,
          moduleStringLiteral: 'antd',
          column,
          line,
        }),
      ],
    });

    fs.writeFileSync(absPath, code);

    res.send('ok');
  });

  app.listen(SERVER_PORT, () => {
    // eslint-disable-next-line
    console.log(`dev-plugin is listening ${SERVER_PORT}`);
  });
};

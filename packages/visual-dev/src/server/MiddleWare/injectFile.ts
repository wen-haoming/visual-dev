import { parsePath } from '../../utils';
import { parse } from '@babel/parser';
import fs from 'fs-extra';
import { transformFromAst } from '@babel/core';
import { injectCoponent } from '../../babel';
import type { RequestHandler } from 'express';

export const injectFile: RequestHandler = (req, res) => {
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
};

export default injectFile;

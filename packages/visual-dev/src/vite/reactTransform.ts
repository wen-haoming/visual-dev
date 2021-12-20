import { parse } from '@babel/parser';
import { transformFromAst } from '@babel/core';
import { insertJSXElementPathPlugin } from '../babel';

export const reactTransform = (rawCode: string, filePath: string): string => {
  const ast = parse(rawCode, {
    sourceType: 'unambiguous',
    allowUndeclaredExports: true,
    allowImportExportEverywhere: true,
    plugins: ['typescript', 'jsx'],
  });

  const { code } = transformFromAst(ast as any, rawCode, {
    plugins: [insertJSXElementPathPlugin],
    filename: filePath,
  });

  return code as string;
};

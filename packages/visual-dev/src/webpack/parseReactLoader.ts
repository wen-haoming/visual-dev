import { parse } from '@babel/parser';
import { transformFromAst } from '@babel/core';
import { insertJSXElementPathPlugin } from '../babel';

export const devtoolLoader = function webpackLoader(this: any, source: any) {
  const { rootContext: rootPath, resourcePath: filePath } = this;

  const ast = parse(source.toString(), {
    sourceType: 'unambiguous',
    allowUndeclaredExports: true,
    allowImportExportEverywhere: true,
    plugins: ['typescript', 'jsx'],
  });
  const { code } = transformFromAst(ast as any, source.toString(), {
    plugins: [insertJSXElementPathPlugin],
    filename: filePath,
    filenameRelative: rootPath,
  });
  return code;
};

export default devtoolLoader;

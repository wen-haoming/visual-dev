import type { loader } from 'webpack';
import { parse } from '@babel/parser';
import { transformFromAst } from '@babel/core';
import { insertParametersPlugin, insertJSXElementPathPlugin } from '@web-devtools/core';

export const devtoolLoader: loader.Loader = function webpackLoader(this, source) {
  const { rootContext: rootPath, resourcePath: filePath } = this;

  const ast = parse(source.toString(), {
    sourceType: 'unambiguous',
    allowUndeclaredExports: true,
    allowImportExportEverywhere: true,
    plugins: ['typescript', 'jsx'],
  });
  const { code } = transformFromAst(ast as any, source.toString(), {
    plugins: [insertParametersPlugin, insertJSXElementPathPlugin],
    filename: filePath,
    filenameRelative: rootPath,
  });
  return code;
};

export default devtoolLoader;

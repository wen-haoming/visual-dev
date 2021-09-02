import type { IApi } from 'umi';
import { createServerMiddleWare, insertJSXElementPathPlugin } from '@web-devtools/core';
import writeAndCopy from './writeAndCopy';
import fs from 'fs';
import path from 'path';

const htmlTplPath = path.resolve(__dirname, '../dev-ui/index.html');

export default (api: IApi) => {
  api.addMiddlewares(createServerMiddleWare);

  api.modifyBabelOpts((babelOptions) => {
    babelOptions.plugins.unshift([insertJSXElementPathPlugin]);
    return babelOptions;
  });

  api.chainWebpack((config) => {
    config.plugin('writeAndCopy').use(writeAndCopy);
    return config;
  });

  api.modifyHTML(($) => {
    $('body').append(`${fs.readFileSync(htmlTplPath)}`);
    return $;
  });
};

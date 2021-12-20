import type { IApi } from 'umi';
import type { Compiler } from 'webpack';
import { createServer } from '../server';
import { insertJSXElementPathPlugin } from '../ast';

import fs from 'fs';
import path from 'path';

const staticDir = 'assets';
const assetsDir = path.resolve(__dirname, `../../dev-ui/${staticDir}`);

const htmlTplPath = path.resolve(__dirname, '../../dev-ui/index.html');
class WriteAndCopy {
  public apply(compiler: Compiler) {
    compiler.hooks.emit.tap('writeFileAndCopyFile', (compilation: any) => {
      // copy file
      const dirs = fs.readdirSync(assetsDir);

      dirs.forEach((fileName) => {
        const content = fs.readFileSync(`${assetsDir}/${fileName}`, 'utf-8');
        // eslint-disable-next-line no-param-reassign
        compilation.assets[`${staticDir}/${fileName}`] = {
          source() {
            return content;
          },
          size() {
            return content.length;
          },
        };
      });
    });
  }
}

export default (api: IApi) => {
  // api.describe({
  //   key: 'visualDev',
  //   config: {
  //     schema(joi) {
  //       return joi.object();
  //     },
  //     onChange: api.ConfigChangeType.regenerateTmpFiles,
  //   },
  //   enableBy: api.EnableBy.config,
  // });

  api.modifyBabelOpts((babelOptions) => {
    babelOptions.plugins.unshift([insertJSXElementPathPlugin]);
    return babelOptions;
  });

  api.chainWebpack((config) => {
    config.plugin('writeAndCopy').use(WriteAndCopy);
    return config;
  });

  api.modifyHTML(($) => {
    $('body').append(`${fs.readFileSync(htmlTplPath)}`);
    return $;
  });

  api.onStart(() => {
    createServer();
  });
};

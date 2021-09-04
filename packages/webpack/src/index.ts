import type { Compiler, Plugin } from 'webpack';
import path from 'path';
import writeAndCopy from './writeAndCopy';
import { createServer } from '@web-devtools/core';

export interface Options {
  injectFile?: boolean;
}

const defaultOptions = {
  injectFile: true,
};

export { devtoolLoader } from './loader';

export const WebpackDevtoolPlugin: Plugin = class {
  public options: Options;

  constructor(options?: Options) {
    this.options = options || defaultOptions;
  }
  apply(compiler: Compiler) {
    compiler.options.module?.rules.push({
      test: /\.(j|t)sx?$/,
      use: {
        loader: path.resolve(__dirname, './loader.js'),
      },
    });

    if (this.options.injectFile) {
      compiler.hooks.emit.tap('writeFileAndCopyFile', writeAndCopy);
    }
    compiler.hooks.environment.tap('createServer', () => {
      createServer();
    });
  }
};

export default WebpackDevtoolPlugin;

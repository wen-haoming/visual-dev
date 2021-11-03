import path from 'path';
import injectFile from './injectFile';
import { createServer } from '../server';
import type { ServerOptions } from '../server';
import type { Compiler } from 'webpack';

export interface Options extends ServerOptions {
  injectFile?: boolean;
}

const defaultOptions = {
  injectFile: true,
};

export { devtoolLoader } from './loader';

export const WebpackDevtoolPlugin = class {
  public options: Options;

  constructor(options: Options) {
    this.options = { ...defaultOptions, ...options };
  }
  apply(compiler: Compiler) {
    compiler.options.module?.rules.push({
      test: /\.(j|t)sx$/,
      use: {
        loader: path.resolve(__dirname, './loader.js'),
      },
    });

    if (this.options.injectFile) {
      compiler.hooks.emit.tap('injectFile', injectFile);
    }
    compiler.hooks.environment.tap('createServer', () => {
      createServer(this.options);
    });
  }
};

export default WebpackDevtoolPlugin;

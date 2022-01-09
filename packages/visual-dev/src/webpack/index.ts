import path from 'path';
import injectFile from './injectFile';
import { createServer } from '../server';
import type { Compiler } from 'webpack';
import type { PluginOptions } from '../';

const defaultOptions = {
  injectFile: true,
};

export const WebpackDevtoolPlugin = class {
  public options: PluginOptions;

  constructor(options: PluginOptions) {
    this.options = { ...defaultOptions, ...options };
  }
  apply(compiler: Compiler) {
    compiler.options.module?.rules.push({
      test: /\.(j|t)sx$/,
      use: {
        loader: path.resolve(__dirname, './parseReactLoader.js'),
      },
    });

    compiler.options.module?.rules.push({
      test: /\.vue$/,
      use: {
        loader: path.resolve(__dirname, './parseVueLoader.js'),
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

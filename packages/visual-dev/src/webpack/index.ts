import analysisPlugin from './analysisPlugin';
import type { ServerProps } from '../server';
import { createServer } from '../server';
import type { Compiler } from 'webpack';
import type { PluginOptions } from '../';
import type { Options } from 'http-proxy-middleware';

const defaultOptions = {
  injectFile: true,
};

const newProxyOptions: Record<string, Options> = {};

export const WebpackDevtoolPlugin = class {
  public options: PluginOptions;

  // rewrite proxy
  static proxy = (proxyOptions: Record<string, string | Options>) => {
    Object.entries(proxyOptions).forEach(([url, val]) => {
      if (typeof val === 'string') {
        newProxyOptions[url] = {
          target: val,
        };
      } else {
        newProxyOptions[url] = {
          ...val,
        };
      }
    });

    return proxyOptions;
  };

  constructor(options: PluginOptions) {
    this.options = { ...defaultOptions, ...options };
  }
  apply(compiler: Compiler) {
    const serverProps = {} as ServerProps;
    // 依赖分析
    analysisPlugin(compiler, this.options.analysisPlugin, serverProps);

    // 启动服务
    compiler.hooks.environment.tap('createServer', () => {
      createServer(this.options, serverProps);
    });

    // compiler.options.module?.rules.push({
    //   test: /\.(j|t)sx$/,
    //   use: {
    //     loader: path.resolve(__dirname, './parseReactLoader.js'),
    //   },
    // });

    // compiler.options.module?.rules.push({
    //   test: /\.vue$/,
    //   use: {
    //     loader: path.resolve(__dirname, './parseVueLoader.js'),
    //   },
    // });

    // if (this.options.injectFile) {
    //   compiler.hooks.emit.tap('injectFile', injectFile);
    // }
  }
};

export default WebpackDevtoolPlugin;

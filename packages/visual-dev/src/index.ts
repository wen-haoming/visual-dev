import type { Options } from 'http-proxy-middleware';

export * from './server';

export const ASSETS_DIR = 'assets';
export const CLIENT_ASSETS_DIR = '_dev-tools';
export const SERVER_PORT = 10078;

export interface PluginOptions {
  injectFile?: boolean; // inject font-end code
  editor?:
    | 'sublime'
    | 'textmate'
    | 'emacs'
    | 'macvim'
    | 'phpstorm'
    | 'webstorm'
    | 'idea'
    | 'vscode'
    | 'vscode-insiders'
    | 'atom'; // open editor config
  port?: number;
  resolve?: {
    includes: string[];
  };
  devServerProxy?: Record<string, Options> | false;
  mode?: 'aim';
  noServer?: boolean;
}

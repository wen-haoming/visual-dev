import type { PluginOption } from 'vite';
import { insertVueAttr, insertReactAttr } from '../ast';
import path from 'path';
import fs from 'fs';
import { createServer } from '../server';
import type { PluginOptions } from '../';

const assetsDir = path.resolve(__dirname, `../../dev-ui/assets`);
const templateFile = path.resolve(__dirname, '../../dev-ui/index.html');

const vitePlugin = (options: PluginOptions): PluginOption => {
  return {
    name: 'visual-dev',
    enforce: 'pre',
    transform(code, id) {
      if (/\.(j|t)sx$/.test(id)) {
        return insertReactAttr(code, id);
      }
      if (/\.vue$/.test(id)) {
        return insertVueAttr(code, id);
      }
      return code;
    },
    transformIndexHtml(html) {
      let targetTemplate = fs.readFileSync(templateFile, 'utf-8');

      targetTemplate = targetTemplate.replace(/\/assets/g, assetsDir);

      html = html.replace(/<body>([\s\S]*)<\/body>/g, ($1: string, $2: string) => {
        return $2 + targetTemplate;
      });
      return html;
    },
    buildStart() {
      createServer(options);
    },
  };
};

export default vitePlugin;

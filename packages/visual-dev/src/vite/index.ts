import type { PluginOption } from 'vite';
import { insertVueAttr, insertReactAttr } from '../ast';

const vitePlugin = (): PluginOption => {
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
  };
};

export default vitePlugin;

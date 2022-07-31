import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@primary-color': '#165DFF',
          '@menu-item-height': '30px',
          '@menu-inline-toplevel-item-height': '30px',
          // 'link-color': '#FFCCCC',
          // 'border-radius-base': '2px',
        },
        javascriptEnabled: true,
        additionalData: `@import '@/styles/var.less';`,
      },
    },
  },
});

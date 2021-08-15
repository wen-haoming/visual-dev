import { defineConfig } from 'umi';
import WebpackDevtoolPlugin from '../../packages/webpack-devtool-plugin';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  webpack5: {},
  chainWebpack(memo) {
    memo.plugin('web-devtool').use(WebpackDevtoolPlugin);
  },
});

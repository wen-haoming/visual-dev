import { defineConfig } from 'umi';
import WebpackDevtoolPlugin from '../../packages/webpack-devtool-plugin';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  mfsu: {},
  // chainWebpack(memo) {
  //   memo.plugin('web-devtools').use(WebpackDevtoolPlugin);
  // },
});

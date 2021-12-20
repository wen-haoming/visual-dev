import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  plugins:[require.resolve('../../packages/visual-dev/plugins/umi'),],
  // visualDev:{}
  // plugins:['visual-dev/plugins/umi'],
  // chainWebpack(memo) {
  //   memo.plugin('web-devtools').use(WebpackDevtoolPlugin);
  // },
});

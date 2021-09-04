import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  plugins:[require.resolve('../../packages/umi/dist'),],
  mfsu:{},
  // chainWebpack(memo) {
  //   memo.plugin('web-devtools').use(WebpackDevtoolPlugin);
  // },
});

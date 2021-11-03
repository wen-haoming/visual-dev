import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {},
  // plugins:[require.resolve('./node_modules/visual-dev/dist/plugins/umi'),],

  plugins:['visual-dev/plugins/umi'],

  resolve:{
    includes:['components']
  },
  // chainWebpack(memo) {
  //   memo.plugin('web-devtools').use(WebpackDevtoolPlugin);
  // },
});

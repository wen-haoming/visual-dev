import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import polyfillNode from 'rollup-plugin-polyfill-node'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: `../../dist/client`,
    assetsDir: '_dev-plugin'
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { '@ant-prefix': 'web-devtools' },
        javascriptEnabled: true
      }
    }
  },
  plugins: [reactRefresh(), polyfillNode()]
})

import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import polyfillNode from 'rollup-plugin-polyfill-node'

export const ASSETS_DIR = '_dev-plugin'
export const DEV_SERVER_PORT = 10010

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: `../../dist/client`,
    assetsDir: ASSETS_DIR
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

import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: { '@ant-prefix': 'web-devtools' },
        javascriptEnabled: true
      }
    }
  },
  plugins: [reactRefresh()]
})

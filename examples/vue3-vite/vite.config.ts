import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VisualDev from '../../packages/visual-dev/src/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),VisualDev()]
})

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VisualDev from './plugins/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VisualDev({ noServer: true }), react()],
  base: '/visual-dev',
});

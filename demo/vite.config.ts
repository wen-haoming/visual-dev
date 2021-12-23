import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VisualDev from '../packages/visual-dev/src/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [VisualDev(), react()],
});

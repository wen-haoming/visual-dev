import './style/vars.less';
import { createApp } from 'vue';
import App from './App.vue';
import type { EDITORS } from 'utils';
import type { Options } from 'http-proxy-middleware';

createApp(App).mount('#dev-tools');

export interface DevConfig {
  mode: string;
  editor: keyof typeof EDITORS;
  devServerProxy?: Record<string, Options>;
}

import './style/vars.less';
import { createApp } from 'vue';
import App from './App.vue';
import type { EDITORS } from 'utils';

createApp(App).mount('#dev-tools');

export interface DevConfig {
  mode: string;
  editor: keyof typeof EDITORS;
}

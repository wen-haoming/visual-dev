/// <reference types="vite/client" />

import type { EDITORS } from 'utils';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

interface DevConfig {
  mode: string;
  editor: keyof typeof EDITORS;
}

interface Window {
  isDemo?: boolean;
}

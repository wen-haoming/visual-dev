/* eslint-disable react-hooks/rules-of-hooks */
import { inject, reactive, provide, onMounted, onUnmounted, watchEffect } from 'vue';
import type { DevConfig } from '../main';
import { useHotkeys } from './useHotkeys';

export const useAimNamespace = 'useStore';
const rawData = {
  type: '',
  component: '',
  visibile: false,
  isAimStatus: false,
  devConfig: {
    editor: 'vscode',
    mode: '',
    shortcuts: {
      inspect: [],
    },
  } as DevConfig,
  setVisibile(visibile: boolean) {
    this.visibile = visibile;
  },
  setIsAimStatus(isAimStatus: boolean) {
    this.isAimStatus = isAimStatus;
  },
  openDrawer() {
    this.component = '';
    this.type = '';
    this.setVisibile(true);
  },
  closeAll() {
    this.component = '';
    this.type = '';
    this.setVisibile(false);
    this.setIsAimStatus(false);
  },
};

export const createStore = () => {
  const data = reactive(rawData);

  const { update } = useHotkeys({
    close_all: {
      keys: [['esc']],
      callback() {
        data.closeAll();
      },
    },
    toggle_aim: {
      keys: [
        ['command', 'shift', 'x'],
        ['ctrl', 'shift', 'x'],
      ],
      callback() {
        data.setIsAimStatus(!data.isAimStatus);
      },
    },
  });

  const handlekeydown = (e: HTMLElementEventMap['keydown']) => {
    switch (e.key) {
      case 'Escape':
        data.setIsAimStatus(false);
        return null;
      default:
        return null;
    }
  };

  watchEffect(() => {
    if (data.devConfig.shortcuts?.inspect?.length) {
      update({
        open_aim: {
          keys: [data.devConfig.shortcuts?.inspect],
          callback: () => data.setIsAimStatus(!data.isAimStatus),
        },
      });
    }
  });

  onMounted(() => {
    window.addEventListener<'keydown'>('keydown', handlekeydown, false);
  });

  onUnmounted(() => {
    window.removeEventListener<'keydown'>('keydown', handlekeydown, false);
  });

  provide(useAimNamespace, reactive(data));
  return data;
};

export const useStore = () => {
  return inject<typeof rawData>(useAimNamespace);
};

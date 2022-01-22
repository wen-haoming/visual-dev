/* eslint-disable react-hooks/rules-of-hooks */
import hotkeys from 'hotkeys-js';
import { onMounted } from 'vue';
import type { KeyHandler } from 'hotkeys-js';

export const scoped = {
  toggle_drawer: 'toggleDrawer',
  toggle_aim: 'toggleAim',
  close_drawer: 'closeDrawer',
  open_aim: 'openAim',
  close_aim: 'closeAim',
  close_all: 'closeAll',
};

type Options = Partial<
  Record<
    keyof typeof scoped,
    {
      keys: string[][];
      callback: KeyHandler;
    }
  >
>;

export const useHotkeys = (options: Options) => {
  onMounted(() => {
    Object.entries(options).forEach(([, value]) => {
      value.keys.forEach((keys) => {
        hotkeys(keys.join('+'), value.callback);
      });
    });
  });

  return {
    update(updateOptions: Options) {
      Object.entries(updateOptions).forEach(([, value]) => {
        value.keys.forEach((keys) => {
          hotkeys(keys.join('+'), value.callback);
        });
      });
    },
    unbind() {
      Object.entries(options).forEach(([scope, value]) => {
        hotkeys.unbind(value.keys.join('+'), scope);
      });
    },
  };
};

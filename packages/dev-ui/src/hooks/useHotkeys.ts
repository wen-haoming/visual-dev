import hotkeys from 'hotkeys-js';
import type { HotkeysEvent } from 'hotkeys-js';
import { reactive, onBeforeUnmount, watchEffect } from 'vue';

export const useHotkeys = (
  defaultHotkeysStr: string,
  callback: (event: KeyboardEvent, handler: HotkeysEvent) => void,
) => {
  const data = reactive({
    hotkeys: defaultHotkeysStr,
  });

  watchEffect(() => {
    data.hotkeys = defaultHotkeysStr;
    hotkeys(data.hotkeys, callback);
  });

  onBeforeUnmount(() => {
    hotkeys.unbind(data.hotkeys);
  });
};

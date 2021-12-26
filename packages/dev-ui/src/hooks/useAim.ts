import { inject, reactive, provide, onMounted, onUnmounted } from 'vue';

export const useAimNamespace = 'useAim';
const rawData = {
  type: '',
  component: '',
  visibile: false,
  isAimStatus: false,
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
  closeDrawer() {
    this.component = '';
    this.type = '';
    this.setVisibile(false);
    this.setIsAimStatus(false);
  },
};

export const createDrawerContext = () => {
  const data = reactive(rawData);
  const handlekeydown = (e: HTMLElementEventMap['keydown']) => {
    switch (e.key) {
      case 'Escape':
        data.setIsAimStatus(false);
        return null;
      default:
        return null;
    }
  };

  onMounted(() => {
    window.addEventListener<'keydown'>('keydown', handlekeydown, false);
  });

  onUnmounted(() => {
    window.removeEventListener<'keydown'>('keydown', handlekeydown, false);
  });

  provide(useAimNamespace, reactive(data));
  return data;
};

export const useAim = () => {
  return inject<typeof rawData>(useAimNamespace);
};

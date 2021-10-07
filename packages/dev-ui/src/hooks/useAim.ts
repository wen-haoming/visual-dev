import { inject, reactive, provide } from 'vue';

export const useAimNamespace = 'useAim';

const data = reactive({
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
  reset() {
    this.component = '';
    this.type = '';
    this.setVisibile(false);
    this.setIsAimStatus(false);
  },
});

export const createAimContext = () => {
  provide(useAimNamespace, data);
  return data;
};

export const useAim = () => {
  return inject<typeof data>(useAimNamespace);
};

import { reactive, provide, inject, onMounted } from 'vue';
import { useRequest } from './';

export const useDocsNamespace = 'useDocs';

const rawData = {
  sliderObject: {},
  currentSlider: {},
  docsContent: '',
  setDocsContent(content: string) {
    this.docsContent = content;
  },
};

export const createDoscContext = () => {
  const data = reactive(rawData);
  onMounted(() => {
    useRequest('getMenu').then((res: any) => {
      data.sliderObject = res;
    });
  });
  provide(useDocsNamespace, data);
  return data;
};

export const useDocs = () => {
  return inject<typeof rawData>(useDocsNamespace);
};

import { reactive, provide, inject, onMounted } from 'vue';
import { getRequest } from '../utils';

export const useDocsNamespace = 'useDocs';

const docsData = reactive({
  sliderObject: {},
  currentSlider: {},
  docsContent: '',
  setDocsContent(content: string) {
    this.docsContent = content;
  },
});

export const createDoscContext = () => {
  onMounted(() => {
    getRequest('web-devtools/getMenu').then((res: any) => {
      docsData.sliderObject = res;
    });
  });
  provide(useDocsNamespace, docsData);
  return docsData;
};

export const useDocs = () => {
  return inject<typeof docsData>(useDocsNamespace);
};

import { inject } from 'vue';

export const usePagesNamespace = 'usePages';

export const usePages = () => {
  return inject(usePagesNamespace);
};

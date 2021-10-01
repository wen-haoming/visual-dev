import { inject } from 'vue';

export const usePagesNamespace = 'usePages';
export const useAimNamespace = 'useAim';

export const useAim = () => {
  return inject(useAimNamespace);
};

export const usePages = () => {
  return inject(usePagesNamespace);
};

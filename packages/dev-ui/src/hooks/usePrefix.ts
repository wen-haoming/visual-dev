import { provide, inject, ref } from 'vue';

export const usePrefixNamespace = 'useRoute';

export const createPrefixContext = (prefix: string) => {
  const prefixData = ref();
  prefixData.value = prefix;
  provide(usePrefixNamespace, prefixData.value);
  return prefixData.value;
};

export const usePrefix = () => {
  return inject<string>(usePrefixNamespace);
};

import { urlPrefix } from '../utils';

export const useRequest: any = async (path: string, requestInit?: RequestInit) => {
  return await fetch(`${urlPrefix}/${path}`, requestInit).then((res) => res.json());
};

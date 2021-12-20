import { insertVueAttr } from '../ast';

export const parseVueLoader = function webpackLoader(this: any, source: string) {
  const { resourcePath: filePath } = this;
  return insertVueAttr(source, filePath);
};

export default parseVueLoader;

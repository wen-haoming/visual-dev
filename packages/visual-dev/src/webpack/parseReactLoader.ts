import { insertReactAttr } from '../ast/insertReactAttr';

export const devtoolLoader = function webpackLoader(this: any, source: any) {
  const { resourcePath: filePath } = this;

  return insertReactAttr(source, filePath);
};

export default devtoolLoader;

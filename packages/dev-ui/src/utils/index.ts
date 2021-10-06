export * from './api';

export const prefix = `http://localhost:10078`;

export const getHasFilePathParentNode = (ele: any) => {
  if (!ele) return null;
  while (!ele.getAttribute('__p') && ele !== document.body) {
    // eslint-disable-next-line no-param-reassign
    ele = ele.parentNode;
  }
  return ele;
};

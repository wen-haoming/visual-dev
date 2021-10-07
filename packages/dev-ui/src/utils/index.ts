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

export function getElementDimensions(domElement: Element) {
  const calculatedStyle = window.getComputedStyle(domElement);
  return {
    borderLeftWidth: `${parseInt(calculatedStyle.borderLeftWidth, 10)}px`,
    borderRightWidth: `${parseInt(calculatedStyle.borderRightWidth, 10)}px`,
    borderTopWidth: `${parseInt(calculatedStyle.borderTopWidth, 10)}px`,
    borderBottomWidth: `${parseInt(calculatedStyle.borderBottomWidth, 10)}px`,
    marginLeft: `${parseInt(calculatedStyle.marginLeft, 10)}px`,
    marginRight: `${parseInt(calculatedStyle.marginRight, 10)}px`,
    marginTop: `${parseInt(calculatedStyle.marginTop, 10)}px`,
    marginBottom: `${parseInt(calculatedStyle.marginBottom, 10)}px`,
    paddingLeft: `${parseInt(calculatedStyle.paddingLeft, 10)}px`,
    paddingRight: `${parseInt(calculatedStyle.paddingRight, 10)}px`,
    paddingTop: `${parseInt(calculatedStyle.paddingTop, 10)}px`,
    paddingBottom: `${parseInt(calculatedStyle.paddingBottom, 10)}px`,
    contentWidth: `${
      parseInt(calculatedStyle.width, 10) -
      parseInt(calculatedStyle.paddingLeft, 10) -
      parseInt(calculatedStyle.paddingRight, 10) -
      parseInt(calculatedStyle.borderLeftWidth, 10) -
      parseInt(calculatedStyle.borderRightWidth, 10)
    }px`,
    contentHeight: `${
      parseInt(calculatedStyle.height, 10) -
      parseInt(calculatedStyle.paddingTop, 10) -
      parseInt(calculatedStyle.paddingBottom, 10) -
      parseInt(calculatedStyle.borderTopWidth, 10) -
      parseInt(calculatedStyle.borderBottomWidth, 10)
    }px`,
  };
}

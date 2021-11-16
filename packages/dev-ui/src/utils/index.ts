export * from './api';

export const prefix = `http://localhost:10078`;

export const getHasFilePathParentNode = (ele: any) => {
  if (!ele) return null;
  while (ele.getAttribute && !ele.getAttribute('__p') && ele !== document.body) {
    // eslint-disable-next-line no-param-reassign
    ele = ele.parentNode;
  }
  return ele;
};

export function getElementDimensions(domElement: Element) {
  const calculatedStyle = window.getComputedStyle(domElement);
  const Rect = domElement.getBoundingClientRect();

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
    left: `${Rect.left + window.scrollX - parseInt(calculatedStyle.marginLeft, 10)}px`,
    top: `${Rect.top + window.scrollY - parseInt(calculatedStyle.marginTop, 10)}px`,
    width: `${
      Rect.width +
      parseInt(calculatedStyle.marginLeft, 10) +
      parseInt(calculatedStyle.marginRight, 10)
    }px`,
    height: `${
      Rect.height +
      parseInt(calculatedStyle.marginTop, 10) +
      parseInt(calculatedStyle.marginBottom, 10)
    }px`,
  };
}

// '/src/App.jsx:5:4' --> App.jsx || '\\src\\App.jsx:5:4' --> App.jsx
export const getCompNameFromStringPath = (srcPath: string) => {
  const path = srcPath.split(':')[0];
  const pathNames = path.split(/[/\\]/);
  return pathNames[pathNames.length - 1];
};

const initialInspectMarginStyle = {
  position: 'absolute',
  'border-color': 'rgba(255, 155, 0, 0.3)',
  'pointer-events': 'none',
  'border-style': 'solid',
};

const initialInspectBorderStyle = {
  'border-color': 'rgba(255, 200, 50, 0.3)',
  'pointer-events': 'none',
  'border-style': 'solid',
};

const initialInspectPaddingStyle = {
  'border-color': 'rgba(77, 200, 0, 0.3)',
  'pointer-events': 'none',
  'border-style': 'solid',
};

const initialInspectContentStyle = {
  'background-color': 'rgba(120, 170, 210, 0.7)',
  'pointer-events': 'none',
};

const initialOverLayerStyle = {
  'z-index': 10000,
  'pointer-events': 'none',
};

interface InspectDivOptions {
  left: string;
  top: string;

  contentWidth: string;
  contentHeight: string;

  marginLeft: string;
  marginRight: string;
  marginTop: string;
  marginBottom: string;

  borderLeftWidth: string;
  borderRightWidth: string;
  borderTopWidth: string;
  borderBottomWidth: string;

  paddingLeft: string;
  paddingRight: string;
  paddingTop: string;
  paddingBottom: string;
}

export class OverLayer {
  overLayer: HTMLDivElement | null;
  inspectMarginDiv: HTMLDivElement | null;
  inspectPaddingDiv: HTMLDivElement | null;
  inspectborderDiv: HTMLDivElement | null;
  inspectContentDiv: HTMLDivElement | null;

  constructor() {
    this.overLayer = document.createElement('div');
    this.inspectMarginDiv = document.createElement('div');
    this.inspectborderDiv = document.createElement('div');
    this.inspectPaddingDiv = document.createElement('div');
    this.inspectContentDiv = document.createElement('div');

    this.inspectPaddingDiv.appendChild(this.inspectContentDiv);
    this.inspectborderDiv.appendChild(this.inspectPaddingDiv);
    this.inspectMarginDiv.appendChild(this.inspectborderDiv);

    Object.assign(this.inspectMarginDiv.style, initialInspectMarginStyle);
    Object.assign(this.inspectborderDiv.style, initialInspectBorderStyle);
    Object.assign(this.inspectPaddingDiv.style, initialInspectPaddingStyle);
    Object.assign(this.inspectContentDiv.style, initialInspectContentStyle);
    Object.assign(this.overLayer.style, initialOverLayerStyle);

    this.overLayer.appendChild(this.inspectMarginDiv);
    document.body.appendChild(this.overLayer);
  }

  update(inspectDivOptions: InspectDivOptions) {
    const {
      left,
      top,

      contentWidth,
      contentHeight,

      marginLeft,
      marginRight,
      marginTop,
      marginBottom,

      borderLeftWidth,
      borderRightWidth,
      borderTopWidth,
      borderBottomWidth,

      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
    } = inspectDivOptions;

    Object.assign(this.inspectMarginDiv?.style, {
      left,
      top,
      'border-left-width': marginLeft,
      'border-right-width': marginRight,
      'border-top-width': marginTop,
      'border-bottom-width': marginBottom,
    });

    Object.assign(this.inspectborderDiv?.style, {
      'border-left-width': borderLeftWidth,
      'border-right-width': borderRightWidth,
      'border-top-width': borderTopWidth,
      'border-bottom-width': borderBottomWidth,
    });

    Object.assign(this.inspectPaddingDiv?.style, {
      'border-left-width': paddingLeft,
      'border-right-width': paddingRight,
      'border-top-width': paddingTop,
      'border-bottom-width': paddingBottom,
    });

    Object.assign(this.inspectContentDiv?.style, {
      width: contentWidth,
      height: contentHeight,
    });
  }
  unmount() {
    this.overLayer?.parentElement?.removeChild(this.overLayer);
    this.inspectContentDiv = null;
    this.inspectborderDiv = null;
    this.inspectPaddingDiv = null;
    this.inspectMarginDiv = null;
    this.overLayer = null;
  }
}

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

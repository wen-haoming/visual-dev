export function setStyle(...options: Record<string, string | number | undefined>[]) {
  const obj = Object.assign(...options);

  return Object.entries(obj).reduce((pre, [key, value]) => {
    value = Number(value) ? `${Number(value)}px` : value;
    if (value === 0 || !!value) {
      pre += `${key}: ${value}; `;
    }
    return pre;
  }, '');
}

export function px2Num(str: string) {
  return Number(str.slice(0, -2));
}

const initialInspectMarginStyle = {
  position: 'absolute',
  'z-index': 10000,
  'border-color': 'rgba(255, 155, 0, 0.3)',
  'pointer-events': 'none',
  'border-style': 'solid',
};

const initialInspectBorderStyle = {
  'border-color': 'rgba(255, 200, 50, 0.3)',
  'border-style': 'solid',
};

const initialInspectPaddingStyle = {
  'border-color': 'rgba(77, 200, 0, 0.3)',
  'border-style': 'solid',
};

const initialInspectContentStyle = {
  'background-color': 'rgba(120, 170, 210, 0.7)',
};

interface InspectDivOptions {
  marginWidth: number | string;
  marginHeight: number | string;
  width: number | string;
  height: number | string;
  contentWidth: number | string;
  contentHeight: number | string;

  left: number | string;
  top: number | string;

  marginLeft: number | string;
  marginRight: number | string;
  marginTop: number | string;
  marginBottom: number | string;

  borderLeftWidth: number | string;
  borderRightWidth: number | string;
  borderTopWidth: number | string;
  borderBottomWidth: number | string;

  paddingLeft: number | string;
  paddingRight: number | string;
  paddingTop: number | string;
  paddingBottom: number | string;
}

export class OverLayer {
  private overLayer: HTMLDivElement | null;
  private inspectMarginDiv: HTMLDivElement | null;
  private inspectPaddingDiv: HTMLDivElement | null;
  private inspectborderDiv: HTMLDivElement | null;
  private inspectContentDiv: HTMLDivElement | null;

  constructor() {
    this.overLayer = document.createElement('div');
    this.inspectMarginDiv = document.createElement('div');
    this.inspectborderDiv = document.createElement('div');
    this.inspectPaddingDiv = document.createElement('div');
    this.inspectContentDiv = document.createElement('div');

    this.inspectPaddingDiv.appendChild(this.inspectContentDiv);
    this.inspectborderDiv.appendChild(this.inspectPaddingDiv);
    this.inspectMarginDiv.appendChild(this.inspectborderDiv);
    this.overLayer.appendChild(this.inspectMarginDiv);
    document.body.appendChild(this.overLayer);
  }

  update(inspectDivOptions: Partial<InspectDivOptions>) {
    const {
      contentWidth,
      contentHeight,

      left,
      top,

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

    this.inspectMarginDiv.style = setStyle(initialInspectMarginStyle, {
      left,
      top,
      'border-left-width': marginLeft,
      'border-right-width': marginRight,
      'border-top-width': marginTop,
      'border-bottom-width': marginBottom,
    });

    this.inspectborderDiv.style = setStyle(initialInspectBorderStyle, {
      'border-left-width': borderLeftWidth,
      'border-right-width': borderRightWidth,
      'border-top-width': borderTopWidth,
      'border-bottom-width': borderBottomWidth,
    });

    this.inspectPaddingDiv.style = setStyle(initialInspectPaddingStyle, {
      'border-left-width': paddingLeft,
      'border-right-width': paddingRight,
      'border-top-width': paddingTop,
      'border-bottom-width': paddingBottom,
    });

    this.inspectContentDiv.style = setStyle(initialInspectContentStyle, {
      width: contentWidth,
      height: contentHeight,
    });
  }
  unmount() {
    this.inspectContentDiv = null;
    this.inspectborderDiv = null;
    this.inspectPaddingDiv = null;
    this.inspectMarginDiv = null;
    document.body.removeChild(this.overLayer);
    this.overLayer = null;
  }
}

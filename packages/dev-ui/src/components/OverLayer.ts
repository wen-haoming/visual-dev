const initialOverLayerStyle = {
  'pointer-events': 'none',
  display: 'none',
};

const initialDetailLayerStyle = {
  'z-index': 100000000,
  position: 'absolute',
  display: 'none',
  'align-items': 'center',
  'font-family': `"SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif;`,
  'font-weight': 'bold',
  padding: '6px 8px',
  'pointer-events': 'none',
  'border-radius': '3px',
  'background-color': 'var(--v-inspect-bg)',
  'box-shadow': `var(--v-inspect-box-shadow)`,
};
const initialDetailLeft = {
  display: 'flex',
  'flex-direction': 'column',
};

const initialDetailRight = {
  color: 'rgb(215, 215, 215)',
};

const initialInspectMarginStyle = {
  'z-index': 100000000,
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

interface InspectDivOptions {
  left: string;
  top: string;

  width: string;
  height: string;

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

interface DomDetail {
  frame: string;
  domType: string;
  componentName?: string;
  srcPath: string;
}

export class OverLayer {
  overLayer: HTMLDivElement | null;
  inspectMarginDiv: HTMLDivElement | null;
  inspectPaddingDiv: HTMLDivElement | null;
  inspectborderDiv: HTMLDivElement | null;
  inspectContentDiv: HTMLDivElement | null;
  detailLayer: HTMLDivElement | null;
  detailLeft: HTMLSpanElement | null;
  detailRight: HTMLSpanElement | null;

  constructor() {
    // layer
    this.overLayer = document.createElement('div');
    this.inspectMarginDiv = document.createElement('div');
    this.inspectborderDiv = document.createElement('div');
    this.inspectPaddingDiv = document.createElement('div');
    this.inspectContentDiv = document.createElement('div');

    this.inspectPaddingDiv.appendChild(this.inspectContentDiv);
    this.inspectborderDiv.appendChild(this.inspectPaddingDiv);
    this.inspectMarginDiv.appendChild(this.inspectborderDiv);

    // detail
    this.detailLayer = document.createElement('div');
    this.detailLeft = document.createElement('span');
    this.detailRight = document.createElement('span');
    this.detailLayer.appendChild(this.detailLeft);
    this.detailLayer.appendChild(this.detailRight);

    // style
    Object.assign(this.inspectMarginDiv.style, initialInspectMarginStyle);
    Object.assign(this.inspectborderDiv.style, initialInspectBorderStyle);
    Object.assign(this.inspectPaddingDiv.style, initialInspectPaddingStyle);
    Object.assign(this.inspectContentDiv.style, initialInspectContentStyle);
    Object.assign(this.overLayer.style, initialOverLayerStyle);

    Object.assign(this.detailLayer.style, initialDetailLayerStyle);
    Object.assign(this.detailLeft.style, initialDetailLeft);
    Object.assign(this.detailRight.style, initialDetailRight);

    this.overLayer.appendChild(this.inspectMarginDiv);
    this.overLayer.appendChild(this.detailLayer);

    document.body.appendChild(this.overLayer);
  }

  update(inspectDivOptions: InspectDivOptions, domDetail: DomDetail) {
    const {
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

      width,
      height,
    } = inspectDivOptions;
    if (
      !this.inspectMarginDiv ||
      !this.inspectborderDiv ||
      !this.inspectPaddingDiv ||
      !this.inspectContentDiv
    )
      return;
    const { domType, srcPath, componentName, frame } = domDetail;

    let renderTitle = '';
    // 如果是大写的证明并且是有值那就是组件本身
    if (/^[A-Z]/.test(String(componentName))) {
      const frameBrandColor =
        frame === 'react' ? '--v-inspect-frame-react' : '--v-inspect-frame-vue';

      renderTitle = ` <div  style="color:var(--v-inspect-tt);">
      <span style="display:inline-block;color:#fff;border-radius:2px;background:var(${frameBrandColor});padding: 0 4px">
        ${componentName}
      </span>
      </div>`;
    } else {
      renderTitle = `
      <div  style="color:var(--v-inspect-tt);">
       ${domType}
    </div>
    `;
    }
    this.detailLeft!.innerHTML = `
    ${renderTitle}
    <div style="color:var(--v-inspect-sub-tt)">
      ${srcPath}
    </div>`;

    Object.assign(this.detailLayer?.style, {
      display: 'flex',
      left,
      top: `${parseInt(top, 10) + parseInt(height, 10) + 10}px`,
    });

    Object.assign(this.inspectMarginDiv?.style, {
      left,
      top,
      'border-left-width': marginLeft,
      'border-right-width': marginRight,
      'border-top-width': marginTop,
      'border-bottom-width': marginBottom,
      width,
      height,
      display: 'flex',
      'box-sizing': 'border-box',
    });

    Object.assign(this.inspectborderDiv?.style, {
      'border-left-width': borderLeftWidth,
      'border-right-width': borderRightWidth,
      'border-top-width': borderTopWidth,
      'border-bottom-width': borderBottomWidth,
      display: 'flex',
      flex: 1,
      'box-sizing': 'border-box',
    });

    Object.assign(this.inspectPaddingDiv?.style, {
      'border-left-width': paddingLeft,
      'border-right-width': paddingRight,
      'border-top-width': paddingTop,
      'border-bottom-width': paddingBottom,
      display: 'flex',
      'box-sizing': 'border-box',
      flex: 1,
    });

    Object.assign(this.inspectContentDiv?.style, {
      display: srcPath ? 'block' : 'none',
      'box-sizing': 'border-box',
      flex: 1,
    });

    Object.assign(this.overLayer?.style, {
      display: 'block',
    });
  }
  unmount() {
    this.overLayer?.parentElement?.removeChild(this.overLayer);
    this.inspectContentDiv = null;
    this.inspectborderDiv = null;
    this.inspectPaddingDiv = null;
    this.inspectMarginDiv = null;
    this.detailLayer = null;
    this.overLayer = null;
  }
}

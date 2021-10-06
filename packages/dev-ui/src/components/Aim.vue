<script lang="ts" setup>
import { postRequest } from '../utils';
import { watchEffect, ref, onBeforeUnmount } from 'vue';
import AimSvg from '../IconCompents/Aim.vue';
import { useAim } from '../hooks';
import { getHasFilePathParentNode } from '../utils';
import { OverLayer } from './OverLayer';

function px2Num(str: string) {
  return Number(str.slice(0, -2));
}

const useAimData: any = useAim();
let previosDom: HTMLElement | null = null;
const OverLayerRef = ref();

const handleAimClick = (e: SVGElementEventMap['click']) => {
  e.stopPropagation();
  useAimData.type = 'inspect_file';
  // 关闭弹窗，同时打开 瞄准模式
  useAimData.changeVisibile(false);
  useAimData.changeIsAimStatus(true);
  document.body.addEventListener<'mousemove'>('mousemove', inspectComponent, false);

  OverLayerRef.value = new OverLayer();
};

// document mouse 事件添加遮罩层样式
const inspectComponent = async (e: HTMLElementEventMap['mousemove' | 'scroll']) => {
  requestAnimationFrame(() => {
    e.stopPropagation();
    let targetDom = e.target as HTMLElement | null;
    targetDom = getHasFilePathParentNode(targetDom);
    if (OverLayerRef.value && OverLayerRef.value.update) {
      const { width, height } = targetDom.getBoundingClientRect();
      const left = targetDom?.offsetLeft;
      const top = targetDom?.offsetTop;
      const {
        paddingLeft,
        paddingTop,
        paddingRight,
        paddingBottom,

        borderLeftWidth,
        borderRightWidth,
        borderTopWidth,
        borderBottomWidth,

        marginLeft,
        marginTop,
        marginBottom,
        marginRight,
      } = window.getComputedStyle(targetDom);
      OverLayerRef.value.update({
        left: `${Number(left) - px2Num(marginLeft)}px`,
        top: `${Number(top) - px2Num(marginTop)}px`,

        contentWidth: `${
          Number(width) -
          px2Num(paddingLeft) -
          px2Num(paddingRight) -
          px2Num(borderLeftWidth) -
          px2Num(borderRightWidth)
        }px`,
        contentHeight: `${
          Number(height) -
          px2Num(paddingTop) -
          px2Num(paddingBottom) -
          px2Num(borderTopWidth) -
          px2Num(borderBottomWidth)
        }px`,

        paddingLeft,
        paddingTop,
        paddingRight,
        paddingBottom,

        borderLeftWidth,
        borderRightWidth,
        borderTopWidth,
        borderBottomWidth,

        marginLeft,
        marginTop,
        marginBottom,
        marginRight,
      });
    }
  });
};

const documentHandleClick = async (e: HTMLElementEventMap['click']) => {
  e.stopPropagation();
  e.preventDefault();
  try {
    let targetDom = e.target as HTMLElement | null;
    targetDom = getHasFilePathParentNode(targetDom);
    const filePath = targetDom?.getAttribute('__p');
    postRequest('web-devtools/launchEditor', { filePath });
  } finally {
    // previosDom?.classList.remove('__layer-dev-tool');
    useAimData.component = '';
    useAimData.type = '';
    useAimData.changeVisibile(false);
    useAimData.changeIsAimStatus(false);
  }
};

watchEffect(() => {
  if (useAimData.getIsAimStatus()) {
    // 注册事件
    document.body.addEventListener<'mousemove'>('mousemove', inspectComponent, false);
    document.body.addEventListener<'click'>('click', documentHandleClick, true);
  } else {
    // OverLayerRef.value?.unmount();
    // 卸载事件
    document.body.removeEventListener<'mousemove'>('mousemove', inspectComponent, false);
    document.body.removeEventListener<'click'>('click', documentHandleClick, true);
  }
});
</script>
<template>
  <AimSvg class="aim-svg" @click="handleAimClick" />
</template>

<style lang="less" scoped>
.aim-svg {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: rotateZ(90deg);
  }
}
</style>

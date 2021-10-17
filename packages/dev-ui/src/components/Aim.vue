<script lang="ts" setup>
import { postRequest } from '../utils';
import { ref, watch } from 'vue';
import AimSvg from '../IconCompents/Aim.vue';
import { useAim } from '../hooks';
import { getHasFilePathParentNode, getElementDimensions } from '../utils';
import { OverLayer } from './OverLayer';

const useAimData = useAim();
let previosDom: HTMLElement | null = null;
const OverLayerRef = ref<OverLayer>();

// document mouse 事件添加遮罩层样式
const inspectComponent = async (e: HTMLElementEventMap['mousemove']) => {
  requestAnimationFrame(() => {
    e.stopPropagation();
    let targetDom = e.target as HTMLElement | null;

    targetDom = getHasFilePathParentNode(targetDom);

    if (targetDom && OverLayerRef.value && previosDom !== targetDom) {
      const dimensions = getElementDimensions(targetDom);

      OverLayerRef.value.update(dimensions);
      previosDom = targetDom;
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
    useAimData?.closeDrawer();
  }
};

const handleAimClick = (e: SVGElementEventMap['click']) => {
  e.stopPropagation();
  useAimData?.closeDrawer();
  useAimData?.setIsAimStatus(true);
};

watch([useAimData], () => {
  if (useAimData?.isAimStatus) {
    // 注册事件
    OverLayerRef.value = new OverLayer();
    window.addEventListener<'mousemove'>('mousemove', inspectComponent, false);
    window.addEventListener<'click'>('click', documentHandleClick, true);
  } else {
    // 卸载事件
    OverLayerRef.value?.unmount();
    window.removeEventListener<'mousemove'>('mousemove', inspectComponent, false);
    window.removeEventListener<'click'>('click', documentHandleClick, true);
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

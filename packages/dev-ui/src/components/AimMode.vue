<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { usePrefix, useAim } from '../hooks';
import SvgIcon from '../IconCompents/SvgIcon.vue';
import { OverLayer } from './OverLayer';
import {
  getHasFilePathParentNode,
  getElementDimensions,
  getCompNameFromStringPath,
  postRequest,
  getRequest,
} from '../utils';

const useAimData = useAim();

const prefix = usePrefix();
const OverLayerRef = ref<OverLayer>();
const mapPathRef = ref<Partial<any>>({});
let previosDom: HTMLElement | null = null;

onMounted(() => {
  getRequest('pathMap').then((res: any) => {
    mapPathRef.value = res;
  });
});

const handleAimClick = (e: SVGElementEventMap['click']) => {
  e.stopPropagation();
  useAimData?.setIsAimStatus(true);
};

// document mouse 事件添加遮罩层样式
const inspectComponent = async (e: HTMLElementEventMap['mousemove']) => {
  requestAnimationFrame(() => {
    e.stopPropagation();
    let targetDom = e.target as HTMLElement | null;

    targetDom = getHasFilePathParentNode(targetDom);

    const path = targetDom?.getAttribute && targetDom?.getAttribute('_p');

    if (
      targetDom &&
      OverLayerRef.value &&
      previosDom !== targetDom &&
      path &&
      mapPathRef.value[path]
    ) {
      const dimensions = getElementDimensions(targetDom);
      OverLayerRef.value.update(dimensions, {
        domType: targetDom.nodeName.toLowerCase(),
        componentName: getCompNameFromStringPath(mapPathRef.value[path]),
        srcPath: mapPathRef.value[path],
      });
    }
    previosDom = targetDom;
  });
};

const documentHandleClick = async (e: HTMLElementEventMap['click']) => {
  e.stopPropagation();
  e.preventDefault();
  try {
    let targetDom = e.target as HTMLElement | null;
    targetDom = getHasFilePathParentNode(targetDom);
    const filePath = targetDom?.getAttribute('_p');
    await postRequest('launchEditor', { filePath: mapPathRef.value[filePath] });
  } catch (e) {
    //
  } finally {
    // previosDom?.classList.remove('__layer-dev-tool');
    useAimData?.setIsAimStatus(false);
  }
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
  <div :class="`${prefix}-aim`" @click="handleAimClick">
    <SvgIcon class="svg" width="100%" height="100%" />
  </div>
</template>

<style lang="less">
@import '../style/vars.less';

.@{prefix-cls}-aim {
}
</style>

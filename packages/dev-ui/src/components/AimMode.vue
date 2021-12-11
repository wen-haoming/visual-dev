<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { usePrefix, useAim } from '../hooks';
import SvgIcon from '../IconCompents/SvgIcon.vue';
import { OverLayer } from './OverLayer';
import {
  getParentNode,
  getElementDimensions,
  getCompNameFromStringPath,
  postRequest,
  getRequest,
} from '../utils';

interface MapPathdata {
  [key: string]: { path: string; componentName: string; frame: string };
}

const useAimData = useAim();

const prefix = usePrefix();
const OverLayerRef = ref<OverLayer>();
const domMap = ref(new Map<Element, string>());

let previosDom: Element | null = null;

onMounted(() => {
  // 收集全局带有 data-v-p 属性的 Dom
  const collectElement = () => {
    const arr = document.querySelectorAll('[data-v-p]');
    if (arr.length === 0) return;
    domMap.value.clear();
    document.querySelectorAll('[data-v-p]').forEach((ele) => {
      const attr = ele.getAttribute('data-v-p');
      if (attr) {
        domMap.value.set(ele, attr);
      }
      ele.removeAttribute('data-v-p');
    });
    console.log(domMap.value);
  };
  collectElement();
  const observer = new MutationObserver(() => {
    collectElement();
  });
  observer.observe(document.body, { attributes: false, childList: true, subtree: true });
});

const handleAimClick = (e: SVGElementEventMap['click']) => {
  e.stopPropagation();
  useAimData?.setIsAimStatus(true);
};

// document mouse 事件添加遮罩层样式
const inspectComponent = async (e: HTMLElementEventMap['mousemove']) => {
  requestAnimationFrame(() => {
    e.stopPropagation();
    //  获取对应的dom
    const targetDom = getParentNode(e.target as Element, (ele) => !!domMap.value.get(ele));
    if (!targetDom) return;
    const targetDomData = domMap.value.get(targetDom);
    if (targetDomData && targetDom && OverLayerRef.value && previosDom !== targetDom) {
      const dimensions = getElementDimensions(targetDom);
      const [srcPath, componentName, frame] = targetDomData.split('|');

      OverLayerRef.value.update(dimensions, {
        frame,
        componentName,
        domType: targetDom.nodeName.toLowerCase(),
        srcPath: getCompNameFromStringPath(srcPath),
      });
    }
    previosDom = targetDom;
  });
};

const documentHandleClick = async (e: HTMLElementEventMap['click']) => {
  e.stopPropagation();
  e.preventDefault();
  try {
    const targetDom = getParentNode(e.target as Element, (ele) => !!domMap.value.get(ele));
    if (!targetDom) return;
    const targetDomData = domMap.value.get(targetDom);
    if (targetDomData) {
      const [srcPath] = targetDomData.split('|');
      console.log(srcPath);
      await postRequest('launchEditor', { filePath: srcPath });
    }
  } finally {
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

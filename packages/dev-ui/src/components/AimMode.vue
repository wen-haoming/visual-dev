<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useStore, usePrefix } from '../hooks';
import SvgIcon from '../IconCompents/Aim.vue';
import Outline from '../IconCompents/Outline.vue';
import { OverLayer } from './OverLayer';
import { getParentNode, getElementDimensions, launchEditor } from '../utils';

const prefix = usePrefix('aim');

const globalData = useStore();
const OverLayerRef = ref<OverLayer>();
const domMap = ref(new WeakMap<Element, string>());

let previosDom: Element | null = null;

onMounted(() => {
  // 收集全局带有 data-v-p 属性的 Dom
  const removeArrtElement = () => {
    document.querySelectorAll('[data-v-p]').forEach((ele) => {
      const attr = ele.getAttribute('data-v-p');
      if (attr) {
        domMap.value.set(ele, attr);
      }
      ele.removeAttribute('data-v-p');
    });
  };
  removeArrtElement();
  const observer = new MutationObserver(() => {
    removeArrtElement();
  });
  // 在热更新的时候，涉及 dom 的更新，需要重新执行回调
  observer.observe(document.body, { attributes: false, childList: true, subtree: true });
});

const handleAimClick = (e: SVGElementEventMap['click']) => {
  e.stopPropagation();
  globalData?.setIsAimStatus(true);
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
      const [, replatePath, componentName, frame] = targetDomData.split('|');

      OverLayerRef.value.update(dimensions, {
        frame,
        componentName,
        domType: targetDom.nodeName.toLowerCase(),
        srcPath: replatePath,
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
    if (!targetDom) {
      OverLayerRef.value?.unmount();
      return;
    }
    const targetDomData = domMap.value.get(targetDom);
    if (targetDomData) {
      const [absolutePath] = targetDomData.split('|');
      const [srcPath, line, column] = absolutePath.split(':');

      // if (targetDom.parentElement && domMap.value.get(targetDom.parentElement)) {
      //   const targetDomParentData = domMap.value.get(targetDom.parentElement)
      //   if (targetDomParentData) {
      //     const [absolutePath2] = targetDomParentData.split('|');
      //     const [srcPath2, line2, column2] = absolutePath2.split(':');
      //     if (srcPath !== srcPath2) {
      //       const url = launchEditor({ srcPath: srcPath2, line: line2, column: column2, editor: globalData!.devConfig.editor });
      //       window.open(url);
      //       globalData?.closeAll();
      //       return
      //     }
      //   }
      // }

      const url = launchEditor({ srcPath, line, column, editor: globalData!.devConfig.editor });
      window.open(url);
    }
  } finally {
    globalData?.closeAll();
  }
};

watchEffect(() => {
  if (globalData?.isAimStatus) {
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
  <div :class="prefix" @click="handleAimClick">
    <SvgIcon v-if="!globalData?.isAimStatus" />
  </div>
</template>

<style lang="less">
@import '../style/vars.less';
.@{prefix-cls}-aim {
  display: flex;
  align-items: center;
}
</style>

<script lang="ts" setup>
import { postRequest } from '../utils';
import { watchEffect, onMounted, onBeforeUnmount } from 'vue';
import AimSvg from '../IconCompents/Aim.vue';
import { useAim } from '../hooks';
import { getHasFilePathParentNode } from '../utils';

const useAimData: any = useAim();
let previosDom: HTMLElement | null = null;

const handleAimClick = (e: SVGElementEventMap['click']) => {
  e.stopPropagation();
  useAimData.type = 'inspect_file';
  // 关闭弹窗，同时打开 瞄准模式
  useAimData.changeVisibile(false);
  useAimData.changeIsAimStatus(true);
  document.body.addEventListener<'mousemove'>('mousemove', inspectComponent, false);
};

// document mouse 事件添加遮罩层样式
const inspectComponent = async (e: HTMLElementEventMap['mousemove']) => {
  e.stopPropagation();
  let targetDom = e.target as HTMLElement | null;
  targetDom = getHasFilePathParentNode(targetDom);
  if (targetDom && targetDom !== previosDom) {
    previosDom?.classList.remove('__layer-dev-tool');
    targetDom.classList.add('__layer-dev-tool');
    previosDom = targetDom;
  }
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
    previosDom?.classList.remove('__layer-dev-tool');
    useAimData.component = '';
    useAimData.type = '';
    useAimData.changeVisibile(false);
    useAimData.changeIsAimStatus(false);
  }
};

watchEffect(() => {
  if (useAimData.getIsAimStatus()) {
    document.body.addEventListener<'mousemove'>('mousemove', inspectComponent, false);
    document.body.addEventListener<'click'>('click', documentHandleClick, true);
  } else {
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

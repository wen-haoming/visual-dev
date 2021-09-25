<script lang="ts" setup>
import { postRequest } from '../../utils';
import { watchEffect, inject } from 'vue';
import AimSvg from '../../IconCompents/Aim.vue';

const useAim: any = inject('useAim');

let previosDom: HTMLElement | null = null;

const handleAimClick = (e: SVGElementEventMap['click']) => {
  e.stopPropagation();
  useAim.type = 'inspect_file';
  // 关闭弹窗，同时打开 瞄准模式
  useAim.changeVisibile(false);
  useAim.changeIsAimStatus(true);
  document.body.addEventListener<'mousemove'>('mousemove', inspectComponent, false);
};

// document mouse 事件添加遮罩层样式
const inspectComponent = async (e: HTMLElementEventMap['mousemove']) => {
  e.stopPropagation();
  const targetDom = e.target as HTMLElement | null;
  if (targetDom && targetDom !== previosDom) {
    previosDom?.classList.remove('__layer-dev-tool');
    targetDom.classList.add('__layer-dev-tool');
    previosDom = targetDom;
  }
};

const documentHandleClick = async (e: HTMLElementEventMap['click']) => {
  e.stopPropagation();
  try {
    const targetDom = e.target as HTMLElement | null;
    // emit('changeVisibile', { visibile: false, isAimStatus: false });
    const filePath = targetDom?.getAttribute('__p');
    if (useAim.type === 'inspect_file') {
      await postRequest('web-devtools/launchEditor', { filePath });
    } else {
      await postRequest('web-devtools/injectFile', {
        filePath,
        type: 'button',
        component: useAim.component,
        componentType: 'ant',
      });
    }
  } finally {
    previosDom?.classList.remove('__layer-dev-tool');
    useAim.component = '';
    useAim.type = '';
    useAim.changeVisibile(false);
    useAim.changeIsAimStatus(false);
  }
};

watchEffect(() => {
  console.log(useAim.getIsAimStatus(), '==');
  if (useAim.getIsAimStatus()) {
    document.body.addEventListener<'mousemove'>('mousemove', inspectComponent, false);
    document.body.addEventListener<'click'>('click', documentHandleClick, false);
  } else {
    document.body.removeEventListener<'mousemove'>('mousemove', inspectComponent, false);
    document.body.removeEventListener<'click'>('click', documentHandleClick, false);
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

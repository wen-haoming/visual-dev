<script setup lang="ts">
import { onMounted } from 'vue';
import { createPrefixContext, createDrawerContext, useHotkeys } from './hooks';
import { getRequest } from './utils';
import AimMode from './components/AimMode.vue';
const data = createDrawerContext();
const prefix = createPrefixContext('vd');

// 初始化快捷键
useHotkeys({
  close_all: {
    keys: [['esc']],
    callback() {
      data.closeAll();
    },
  },
  toggle_aim: {
    keys: [
      ['command', 'shift', 'x'],
      ['ctrl', 'shift', 'x'],
    ],
    callback() {
      data.setIsAimStatus(!data.isAimStatus);
    },
  },
});

onMounted(async () => {
  if (window.isDemo) return;
  // if (window.isDemo) {
  //   AsyncApp.value = defineAsyncComponent(() => import('./components/AimMode.vue'));
  //   return;
  // }
  // const { mode } = await getRequest('getConfig');

  // if (mode === 'aim') {
  //   AsyncApp.value = defineAsyncComponent(() => import('./components/AimMode.vue'));
  // } else {
  // }
});
</script>

<template>
  <div :class="`${prefix}-pos`">
    <AimMode />
    <!-- <suspense>
      <Component :is="AsyncApp" />
    </suspense>-->
  </div>
</template>
<style lang="less">
@import './style/vars.less';
.@{prefix-cls}-pos {
  position: fixed;
  bottom: 30px;
  left: -15px;
  width: 30px;
  height: 30px;
  transition: all 0.2s;
  cursor: pointer;
  color: var(--v-brand);
  z-index: 999999999;
  &:hover {
    left: 5px;
  }
}
</style>

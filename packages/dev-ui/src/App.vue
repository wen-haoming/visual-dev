<script setup lang="ts">
import { onMounted, ref, shallowRef, defineAsyncComponent, h } from 'vue';
import { createPrefixContext, createDrawerContext } from './hooks';
import { getRequest } from './utils';

createDrawerContext();
const prefix = createPrefixContext('vd');

const AsyncApp = shallowRef<any>(h('span', {}));

onMounted(async () => {
  const { mode } = await getRequest('getConfig');

  if (mode === 'aim') {
    AsyncApp.value = defineAsyncComponent(() => import('./components/AimMode.vue'));
  } else {
  }
});
</script>

<template>
  <div :class="`${prefix}-pos`">
    <suspense>
      <Component :is="AsyncApp" />
    </suspense>
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
  &:hover {
    transform: rotateZ(90deg);
    left: 5px;
  }
}
</style>

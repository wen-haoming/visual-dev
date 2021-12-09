<script setup lang="ts">
import { onMounted, ref, shallowRef, defineAsyncComponent, defineComponent, h } from 'vue';
import { getFetch } from './utils';
import AimMode from './components/AimMode.vue';

const AsyncApp = shallowRef<any>(h('span', {}));

onMounted(async () => {
  const { mode } = await getFetch('getConfig');
  console.log(mode);
  if (mode === 'aim') {
    AsyncApp.value = defineAsyncComponent(() => import('./components/AimMode.vue'));
  } else {
  }
});
</script>

<template>
  <suspense>
    <Component :is="AsyncApp" />
  </suspense>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { createPrefixContext, createStore } from './hooks';
import { getRequest } from './utils';
import Folder from './components/Folder.vue';

const prefix = createPrefixContext('vd');
const data = reactive({
  loading: true,
});
const globalData = createStore();

onMounted(async () => {
  if (window.isDemo) {
    globalData.devConfig = {
      devServerProxy: false,
      editor: 'vscode',
      mode: 'aim',
    };
  }
  data.loading = true;
  globalData.devConfig = await getRequest('getConfig');
  data.loading = false;
});
</script>

<template>
  <div :class="`${prefix}-pos`" v-if="!data.loading">
    <Folder />
  </div>
</template>
<style lang="less">
@import './style/vars.less';
.@{prefix-cls}-pos {
  position: fixed;
  bottom: 30px;
  left: 0px;
  transition: all 0.2s;
  cursor: pointer;
  color: var(--v-brand);
  z-index: 999999999;
  // &:hover {
  //   left: 5px;
  // }
}
</style>

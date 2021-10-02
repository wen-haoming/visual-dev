<script lang="ts" setup>
import { createDoscContext } from '../../hooks';
import SliderBar from './SliderBar.vue';
const docsData = createDoscContext();
</script>
<template>
  <SliderBar />
  <div class="l-content" v-html="docsData?.docsContent || ''" />
</template>
<style scoped lang="less">
.l-content {
  position: absolute;
  top: calc(var(--top-header-height) + var(--header-height));
  right: 0;
  bottom: 0;
  left: var(--sider-bar);
  box-sizing: border-box;
  margin: 0;
  padding: 1rem 1.5rem;
  overflow-y: auto;
  border-right: 1px solid var(--c-divider);
}
</style>

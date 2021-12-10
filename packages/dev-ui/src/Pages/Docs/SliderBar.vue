<script lang="ts" setup>
import { useDocs } from '../../hooks';
import SliderLink from './SliderLink.vue';

const docsData = useDocs();
</script>
<template>
  <div class="l-aside">
    <SliderLink :slider-object-or-content="docsData?.sliderObject" />
  </div>
</template>
<style lang="less" scoped>
.l-aside {
  position: absolute;
  top: calc(var(--top-header-height) + var(--header-height));
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  width: var(--sider-bar);
  margin: 0;
  padding: 0;
  border-right: 1px solid var(--v-divider);
}
</style>

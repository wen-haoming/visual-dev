<script lang="ts" setup>
import { watchEffect } from 'vue';
import { useDocs } from '../../hooks';
import SliderLink from './SliderLink.vue';

const docsData = useDocs();

watchEffect(() => {
  console.log(docsData?.sliderObject, '++');
});
</script>
<template>
  <ul class="l-aside">
    <SliderLink
      :slider-title="key"
      :slider-object="value"
      v-for="(value, key, index) in docsData?.sliderObject"
    />
  </ul>
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
  border-right: 1px solid var(--c-divider);
}
</style>

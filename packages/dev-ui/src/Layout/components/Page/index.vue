<script lang="ts" setup>
import { inject, watchEffect, ref } from 'vue';
import MarkdownIt from 'markdown-it';

const pagesData: any = inject('usePages');
const pageContent = ref('');
const md = new MarkdownIt();

watchEffect(() => {
  const [key1, key2] = pagesData.sliderKeys.split('-');
  if (
    pagesData.sliderObject &&
    pagesData.sliderObject[key1] &&
    pagesData.sliderObject[key1][key2]
  ) {
    pageContent.value = md.render(pagesData.sliderObject[key1][key2]);
  } else {
    pageContent.value = '';
  }
});
</script>
<template>
  <div class="l-page">
    <div class="l-content" v-html="pageContent"></div>
  </div>
</template>

<style lang="less" scoped>
.l-page {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding-left: var(--sider-bar);
  padding-top: calc(var(--top-header-height) + var(--header-height));
  .l-content {
    padding: 0 1.5rem 2.25rem;
  }
}
</style>

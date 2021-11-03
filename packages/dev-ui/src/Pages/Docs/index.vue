<script lang="ts" setup>
import { createDoscContext } from '../../hooks';
import SliderBar from './SliderBar.vue';
const docsData = createDoscContext();
</script>
<template>
  <SliderBar />
  <div class="l-content markdown" v-html="docsData?.docsContent || ''" />
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

  /deep/ table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ebedf1;
    th {
      font-weight: 600;
      background: #f9fafb;
    }
    th,
    td {
      padding: 10px 24px;
      border: 1px solid #ebedf1;
    }
  }
}
</style>

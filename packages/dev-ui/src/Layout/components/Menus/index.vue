<script lang="ts" setup>
import Aim from '../../../components/Aim/index.vue';
</script>

<template>
  <header class="h-header">
    <div class="h-tt">
      <span class="t1">Dev</span>
      <span class="t2">tools</span>
    </div>
    <Aim />
  </header>
</template>

<style scoped lang="less">
.h-header {
  position: absolute;
  top: 31px;
  left: 0;
  top: var(--top-header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  border-bottom: 1px solid var(--c-divider);
  padding: 0 2rem;
  width: 100%;
  z-index: var(--z-index);
  .h-tt {
    color: var(--c-brand);
    .t1 {
      font-weight: 600;
      font-size: 1.3rem;
      color: rgba(32, 130, 166, 1);
    }
    .t2 {
      font-size: 1rem;
      font-weight: 500;
      margin-left: 0.2rem;
    }
  }
}
</style>

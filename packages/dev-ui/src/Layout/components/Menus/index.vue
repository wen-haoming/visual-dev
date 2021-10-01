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
  top: var(--top-header-height);
  left: 0;
  z-index: var(--z-index);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--header-height);
  padding: 0 2rem;
  border-bottom: 1px solid var(--c-divider);
  .h-tt {
    color: var(--c-brand);
    .t1 {
      color: rgba(32, 130, 166, 1);
      font-weight: 600;
      font-size: 1.3rem;
    }
    .t2 {
      margin-left: 0.2rem;
      font-weight: 500;
      font-size: 1rem;
    }
  }
}
</style>

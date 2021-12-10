<script setup lang="ts">
// import { onMounted } from 'vue';
// import { useHotkeys } from '../../hooks';
// useHotkeys('command+b', () => {
//   alert('hhh');
// });
</script>
<template>
  <div className="l-setting">
    <div class="l-tt">设置快捷键</div>
    <div class="hot-key-wrap">代码定位： <input type="text" /></div>
  </div>
</template>
<style lang="less" scoped>
.l-setting {
  padding: 1rem;
  .l-tt {
    color: var(--v-text-light-1);
    font-weight: 500;
    font-size: 16px;
  }
  .keyboard-wrap {
  }
}
</style>

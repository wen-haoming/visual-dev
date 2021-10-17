<script setup lang="ts">
import { onMounted } from 'vue';
import { useHotkeys } from '../../hooks';

onMounted(() => {
  console.log('onMounted');
});

// useHotkeys('command+b', () => {
//   alert('hhh');
// });
</script>
<template>
  <div class="l-setting">
    123
    <!-- <div class="keyboard-wrap"><input type="text" /> + <input type="text" /></div> -->
  </div>
</template>
<style lang="less" scoped>
.l-setting {
  padding: 1rem;
  .keyboard-wrap {
  }
}
</style>

<script setup lang="ts">
import { usePrefix } from '../hooks';

const prefix = usePrefix('outline');
</script>
<template>
  <div :class="prefix"></div>
</template>
<style scoped lang="less">
@import '../style/vars.less';

.@{prefix-cls}-outline {
  position: fixed;
  pointer-events: none;
  border: 4px solid var(--v-brand);
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
</style>

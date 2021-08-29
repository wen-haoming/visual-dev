<script lang="ts" setup>
import SvgIcon from './components/SvgIcon.vue'
</script>
<template>
  <div class="icon" style="width: 30px; height: 30px">
    <SvgIcon class="svg" style="width: 30px; height: 30px" />
  </div>
</template>
<style lang="less" scoped>
.icon {
  position: fixed;
  bottom: 30px;
  left: 0;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 2px;
  cursor: pointer;
  .svg {
    transition: transform 0.4s;
    &:hover {
      transform: rotateZ(90deg);
    }
  }
}
</style>

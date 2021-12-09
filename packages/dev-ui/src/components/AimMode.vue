<script lang="ts" setup>
import SvgIcon from '../IconCompents/SvgIcon.vue';
</script>

<template>
  <div>
    <SvgIcon class="svg" />
  </div>
</template>

<style scoped lang="less">
#dev-tools-icon {
  position: fixed;
  bottom: 50px;
  left: -20px;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 2px;
  cursor: pointer;
  user-select: none;
  transition: left 0.2s;
  z-index: 99999999999;
  &:hover {
    left: 0;
  }
  .svg {
    width: 30px;
    height: 30px;
    transition: transform 0.4s;
    &:hover {
      transform: rotateZ(90deg);
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  top: 15% !important;
  opacity: 0 !important;
}
</style>

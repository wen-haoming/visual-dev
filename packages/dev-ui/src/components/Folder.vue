<script lang="ts" setup>
import { usePrefix, useStore } from '../hooks';
import RightArrow from '../IconCompents/RightArrow.vue';
import AimMode from './AimMode.vue';

const prefix = usePrefix('folder');
const globalData = useStore();
</script>
<template>
  <div :class="`${prefix}`" v-show="!globalData?.isAimStatus">
    <div :class="`${prefix}-btns`">
      <AimMode :style="{ width: '10px', height: '10px' }" />
      <span :class="`${prefix}-split`"></span>
    </div>
    <RightArrow :class="`${prefix}-arrow`" />
  </div>
</template>
<style lang="less">
@import '../style/vars.less';

.@{prefix-cls}-folder {
  display: flex;
  align-items: center;
  height: 40px;
  background-color: #f2f3f5;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-sizing: border-box;
  transform: translateX(-35px);
  transition: all 0.2s;
  &:hover {
    transform: translateX(0);
    .@{prefix-cls}-folder-arrow {
      transform: rotateZ(180deg);
    }
  }

  &-arrow {
    width: 20px;
    height: 100%;
    font-size: 12px;
    color: var(--v-brand);
  }
  &-btns {
    display: flex;
    height: 100%;
  }
  &-split {
    display: inline-block;
    width: 1px;
    height: 100%;
    background-color: #fff;
  }
}
</style>

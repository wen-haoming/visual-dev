<script lang="ts" setup>
import { computed } from 'vue';
import { usePrefix, useStore } from '../hooks';
import RightArrow from '../IconCompents/RightArrow.vue';
import ProxyMode from './ProxyMode.vue';
import AimMode from './AimMode.vue';
import Outline from '../IconCompents/Outline.vue';

const prefix = usePrefix('folder');
const globalData = useStore();

// const isShowFolder = computed(
//   () => !globalData?.isAimStatus && globalData?.devConfig.mode !== 'aim',
// );
// const isShowAim = computed(() => !isShowFolder.value);
</script>
<template>
  <!-- <div :class="`${prefix}`" v-if="isShowFolder">
    <div :class="`${prefix}-btns`">
      <ProxyMode />
      <span :class="`${prefix}-split`"></span>
      <AimMode />
      <span :class="`${prefix}-split`"></span>
    </div>
    <RightArrow :class="`${prefix}-arrow`" />
  </div> 
   <div :class="`${prefix}-aim-btn`" v-show="isShowAim">
    <AimMode />
  </div>-->
  <div :class="`${prefix}-aim-btn`">
    <AimMode />
  </div>
  <Outline v-if="globalData?.isAimStatus" />
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
  transform: translateX(-65px);
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
  &-aim-btn {
    transform: translateX(-50%);
    transition: all 0.2s;
    &:hover {
      transform: translateX(0);
    }
  }
}
</style>

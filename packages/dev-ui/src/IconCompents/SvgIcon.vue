<script setup lang="ts">
import { usePrefix } from '../hooks';

const prefix = usePrefix('aim-icon');
</script>
<template>
  <div :class="prefix">
    <div :class="`${prefix}-top`"></div>
    <div :class="`${prefix}-right`"></div>
    <div :class="`${prefix}-bottom`"></div>
    <div :class="`${prefix}-left`"></div>
    <div :class="`${prefix}-center`"></div>
  </div>
</template>
<style lang="less" scoped>
@import '../style/vars.less';

.@{prefix-cls}-aim-icon {
  position: relative;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 3px solid #ccc;
  > div {
    position: absolute;
    background-color: #ccc;
    transition: all 0.3s;
  }

  &-top {
    left: 50%;
    margin-left: -1.5px;
    top: -6px;
    width: 3px;
    height: 6px;
  }
  &-right {
    right: -6px;
    margin-top: 7.5px;
    width: 6px;
    height: 3px;
  }
  &-bottom {
    width: 3px;
    height: 6px;
    left: 50%;
    margin-left: -1.5px;
    bottom: -6px;
  }
  &-left {
    left: -6px;
    margin-top: 7.5px;
    width: 6px;
    height: 3px;
  }
  &-center {
    left: 50%;
    top: 50%;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    margin-left: -2.5px;
    margin-top: -2.5px;
  }
  &:hover {
    border-color: var(--v-brand);
    .@{prefix-cls}-aim-icon {
      &-top {
        background-color: var(--v-brand);
      }
      &-right {
        background-color: var(--v-brand);
      }
      &-bottom {
        background-color: var(--v-brand);
      }
      &-left {
        background-color: var(--v-brand);
      }
      &-center {
        background-color: var(--v-brand);
      }
    }
  }
  &:active {
    border-color: var(--v-brand-active);
    .@{prefix-cls}-aim-icon {
      &-top {
        height: 10px;
        background-color: var(--v-brand-active);
      }
      &-right {
        width: 10px;
        background-color: var(--v-brand-active);
      }
      &-bottom {
        height: 10px;
        background-color: var(--v-brand-active);
      }
      &-left {
        width: 10px;
        background-color: var(--v-brand-active);
      }
      &-center {
        background-color: var(--v-brand-active);
      }
    }
  }
}
</style>

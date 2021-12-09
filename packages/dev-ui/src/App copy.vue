<script lang="ts" setup>
import SvgIcon from './IconCompents/SvgIcon.vue';
import CloseIcon from './IconCompents/Close.vue';
import Drawer from './Layout/index.vue';
import { ref, computed } from 'vue';
import { createRouteContext, createDrawerContext, useHotkeys } from './hooks';
import { prefix } from './utils';

// 创建路由
createRouteContext();

// 创建弹窗数据
const data = createDrawerContext();

// 初始化快捷键
useHotkeys({
  toggle_drawer: {
    keys: [
      ['command', 'shift', 'z'],
      ['ctrl', 'shift', 'z'],
    ],
    callback() {
      if (data.visibile) {
        data.closeDrawer();
      } else {
        data.openDrawer();
      }
    },
  },
  toggle_aim: {
    keys: [
      ['command', 'shift', 'x'],
      ['ctrl', 'shift', 'x'],
    ],
    callback() {
      data.setIsAimStatus(!data.isAimStatus);
    },
  },
});

const iconRef = ref<HTMLDivElement>();

const closeStatus = computed(() => {
  return data.visibile || data.isAimStatus;
});

const handleClick = (e: any) => {
  e.stopPropagation();
  data.setIsAimStatus(false);
  data.setVisibile(!data.visibile);
};
</script>
<template>
  <div id="dev-tools-icon" ref="iconRef" @click="handleClick">
    <SvgIcon v-if="!closeStatus" class="svg" />
    <CloseIcon v-else class="svg" />
  </div>
  <transition name="slide">
    <Drawer
      v-show="data.visibile"
      @changeVisibile="
      ({ isAimStatus, visibile }: any) => {
        data.isAimStatus = isAimStatus;
        data.visibile = visibile;
      }
      "
      :is-aim-status="data.isAimStatus"
    />
  </transition>
</template>
<style lang="less" scoped>
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

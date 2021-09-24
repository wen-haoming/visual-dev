<script lang="ts" setup>
import SvgIcon from './IconCompents/SvgIcon.vue';
import CloseIcon from './IconCompents/Close.vue';
import Drawer from './components/Drawer/index.vue';
import { reactive, ref, onMounted, computed } from 'vue';

const data = reactive<{
  visibile: boolean;
  isAimStatus: boolean;
}>({
  visibile: false,
  isAimStatus: false,
});

const iconRef = ref<HTMLDivElement>();

const closeStatus = computed(() => {
  return data.visibile || data.isAimStatus;
});

const handleClick = (e: any) => {
  e.stopPropagation();
  data.isAimStatus = false;
  data.visibile = !data.visibile;
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
        ({ isAimStatus, visibile }) => {
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
  bottom: 30px;
  left: 0;
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 2px;
  cursor: pointer;
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
  transition: all 0.4s ease;
}
.slide-enter-from,
.slide-leave-to {
  top: 32% !important;
  min-width: 0 !important;
  min-height: 0 !important;
  opacity: 0 !important;
}
</style>

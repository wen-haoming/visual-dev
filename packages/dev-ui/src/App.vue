<script lang="ts" setup>
import SvgIcon from './IconCompents/SvgIcon.vue'
import CloseIcon from './IconCompents/Close.vue'
import Drawer from './components/Drawer.vue'
import { reactive, ref, onMounted, computed, watchEffect } from 'vue'

const data = reactive<{
  visibile: boolean
  isAimStatus: boolean
  DrawerPositionBottom: number | undefined
  DrawerPositionLeft: number | undefined
}>({
  visibile: false,
  isAimStatus: false,
  DrawerPositionBottom: 0,
  DrawerPositionLeft: 0
})

const iconRef = ref<HTMLDivElement>()

const closeStatus = computed(() => {
  return data.visibile || data.isAimStatus
})

onMounted(() => {
  const baseOffset = 20
  data.DrawerPositionBottom =
    window.innerHeight - (iconRef.value?.offsetTop || 0) + baseOffset
  data.DrawerPositionLeft = (iconRef.value?.offsetLeft || 0) + baseOffset
})

const handleClick = (e: HTMLElementEventMap['click']) => {
  e.stopPropagation()
  data.isAimStatus = false
  data.visibile = !data.visibile
}
</script>
<template>
  <div class="icon" ref="iconRef" @click="handleClick">
    <SvgIcon v-if="!closeStatus" class="svg" />
    <CloseIcon v-else class="svg" />
  </div>
  <transition name="slide">
    <Drawer
      v-show="data.visibile"
      @changeVisibile="
        ({ isAimStatus, visibile }) => {
          data.isAimStatus = isAimStatus
          data.visibile = visibile
        }
      "
      :is-aim-status="data.isAimStatus"
      :style="`bottom: ${data.DrawerPositionBottom}px; left: ${data.DrawerPositionLeft}px`"
    />
  </transition>
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
  transform: translateY(20px);
  opacity: 0;
}
</style>

<script lang="ts" setup>
// import { SERVER_PORT } from '@web-devtools/core'
import AimIcon from '../IconCompents/Aim.vue';
import { watchEffect } from 'vue'

const props = defineProps({
  isAimStatus: {
    required: true,
    type: Boolean
  }
})

const emit = defineEmits<{
  (e: 'changeVisibile', flag: { visibile: boolean; isAimStatus: boolean }): void
}>()


let previosDom: HTMLElement | null = null

const handleAimClick = (e: HTMLElementEventMap['click']) => {
  e.stopPropagation()
  e.preventDefault()
  // 关闭弹窗，同时打开 瞄准模式
  emit('changeVisibile', { visibile: false, isAimStatus: true })
  document.body.addEventListener<'mousemove'>(
    'mousemove',
    inspectComponent,
    false
  )
}

const inspectComponent = async (e: HTMLElementEventMap['mousemove']) => {
  const targetDom = e.target as HTMLElement | null
  if (targetDom && targetDom !== previosDom) {
    previosDom?.classList.remove('__layer-dev-tool')

    targetDom.classList.add('__layer-dev-tool')
    previosDom = targetDom
  }
}

const documentHandleClick = async (e: HTMLElementEventMap['click']) => {
  const targetDom = e.target as HTMLElement | null
  emit('changeVisibile', { visibile: false, isAimStatus: false })
  const filePath = targetDom?.getAttribute('__p')
  await fetch(`http://localhost:10063/launchEditor`,{
    method:'post',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({filePath})
  })
  previosDom?.classList.remove('__layer-dev-tool')
}

watchEffect(() => {
  if (props.isAimStatus) {
    document.body.addEventListener<'mousemove'>(
      'mousemove',
      inspectComponent,
      false
    )
    document.body.addEventListener<'click'>('click', documentHandleClick, false)
  } else {
    document.body.removeEventListener<'mousemove'>(
      'mousemove',
      inspectComponent,
      false
    )
    document.body.removeEventListener<'click'>(
      'click',
      documentHandleClick,
      false
    )
  }
})
</script>

<template>
  <div class="drawer">
    <div class="header">Dev-plugin</div>
    <div class="content"></div>
    <div class="footer">
      <AimIcon class="aim-icon" title="组件定位" @click="handleAimClick"></AimIcon>
    </div>
  </div>
</template>

<style  scoped>
.drawer {
  position: fixed;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  min-height: 200px;
  color: rgba (255, 255, 255, 0.65);
  font-size: 14px;
  background-color: #23232e;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0 10px 10px -5px;
  will-change: transform;
}
.header,
.footer {
  height: 30px;
  padding: 2px 10px;
  line-height: 30px;
  background-color: #30303d;
}
.footer {
  text-align: right;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}
.aim-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.header {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.content {
  flex: 1;
  padding: 10px;
}
</style>

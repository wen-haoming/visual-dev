<script lang="ts" setup>
import { ref, onMounted, toRefs, reactive, watchEffect, effect } from 'vue'
import AimIcon from '../IconCompents/Aim.vue'

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

const inspectComponent = (e: HTMLElementEventMap['mousemove']) => {
  const targetDom = e.target as HTMLElement | null
  // targetDom?.getAttribute('__p')
  if (targetDom && targetDom !== previosDom) {
    previosDom?.classList.remove('__layer-dev-tool')
    targetDom.classList.add('__layer-dev-tool')
    previosDom = targetDom
  }
}

const documentHandleClick = () => {
  emit('changeVisibile', { visibile: false, isAimStatus: false })
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
      <AimIcon class="aim-icon" title="组件定位" @click="handleAimClick" />
    </div>
  </div>
</template>

<style lang="less">
@import '../style/global.less';

.drawer {
  position: fixed;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  min-height: 200px;
  color: @font-color;
  font-size: 14px;
  background-color: @primary-color;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 20px 25px -5px,
    rgba(0, 0, 0, 0.04) 0 10px 10px -5px;
  will-change: transform;
  .header,
  .footer {
    height: 30px;
    padding: 2px 10px;
    line-height: 30px;
    background-color: @block-color;
  }
  .footer {
    text-align: right;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;

    .aim-icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
  }
  .header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .content {
    flex: 1;
    padding: 10px;
  }
}
</style>

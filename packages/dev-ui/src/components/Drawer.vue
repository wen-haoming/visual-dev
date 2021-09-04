<script lang="ts" setup>
import AimIcon from '../IconCompents/Aim.vue';
import { watchEffect, reactive } from 'vue';

const props = defineProps({
  isAimStatus: {
    required: true,
    type: Boolean,
  },
});
const emit = defineEmits({
  changeVisibile: (flag: { visibile: boolean; isAimStatus: boolean }) => true,
});

//@ts-nocheck

type HandleType = 'inspect_file' | 'inject_comp' | '';

const data = reactive<{
  type: HandleType;
}>({
  type: '',
});

let previosDom: HTMLElement | null = null;

const handleAimClick = (e: SVGElementEventMap['click']) => {
  e.stopPropagation();
  data.type = 'inspect_file';
  // 关闭弹窗，同时打开 瞄准模式
  emit('changeVisibile', { visibile: false, isAimStatus: true });
  document.body.addEventListener<'mousemove'>('mousemove', inspectComponent, false);
};

const handleInjectFileClick = (e: any) => {
  e.stopPropagation();
  data.type = 'inject_comp';
  // 关闭弹窗，同时打开 瞄准模式
  emit('changeVisibile', { visibile: false, isAimStatus: true });
  document.body.addEventListener<'mousemove'>('mousemove', inspectComponent, false);
};

const inspectComponent = async (e: HTMLElementEventMap['mousemove']) => {
  const targetDom = e.target as HTMLElement | null;
  if (targetDom && targetDom !== previosDom) {
    previosDom?.classList.remove('__layer-dev-tool');
    targetDom.classList.add('__layer-dev-tool');
    previosDom = targetDom;
  }
};

const documentHandleClick = async (e: HTMLElementEventMap['click']) => {
  const targetDom = e.target as HTMLElement | null;
  emit('changeVisibile', { visibile: false, isAimStatus: false });

  const filePath = targetDom?.getAttribute('__p');

  if (data.type === 'inspect_file') {
    await fetch(`http://localhost:10078/web-devtools/launchEditor`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filePath }),
    });
  } else {
    await fetch(`http://localhost:10078/web-devtools/injectFile`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ filePath, type: 'button' }),
    });
  }

  previosDom?.classList.remove('__layer-dev-tool');
};

watchEffect(() => {
  if (props.isAimStatus) {
    document.body.addEventListener<'mousemove'>('mousemove', inspectComponent, false);
    document.body.addEventListener<'click'>('click', documentHandleClick, false);
  } else {
    document.body.removeEventListener<'mousemove'>('mousemove', inspectComponent, false);
    document.body.removeEventListener<'click'>('click', documentHandleClick, false);
  }
});
</script>

<template>
  <div id="dev-tools-drawer">
    <div class="header">Dev-plugin</div>
    <div class="content">
      <button @click="handleInjectFileClick">注入一个button</button>
    </div>
    <div class="footer">
      <AimIcon class="aim-icon" title="组件定位" @click="handleAimClick"></AimIcon>
    </div>
  </div>
</template>

<style scoped>
#dev-tools-drawer {
  position: fixed;
  display: flex;
  flex-direction: column;
  min-width: 500px;
  min-height: 300px;
  color: rgba (255, 255, 255, 0.65);
  font-size: 14px;
  background-color: #23232e;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 20px 25px -5px, rgba(0, 0, 0, 0.04) 0 10px 10px -5px;
  transform: translate3d(calc(50vw - 50%), calc(-60vh - 50%), 0);
  will-change: transform;
}
.header,
.footer {
  height: 30px;
  padding: 2px 10px;
  color: #fff;
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

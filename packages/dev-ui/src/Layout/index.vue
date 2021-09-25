<script lang="ts" setup>
import { onMounted } from 'vue';
import { watchEffect, reactive } from 'vue';
import { locationOrigin } from '../utils';
import Menus from './components/Menus/index.vue';
import Page from './components/Page/index.vue';
import Slider from './components/Slider/index.vue';

const props = defineProps({
  isAimStatus: {
    required: true,
    type: Boolean,
  },
});

const emit = defineEmits({
  changeVisibile: (flag: { visibile: boolean; isAimStatus: boolean }) => true,
});

type HandleType = 'inspect_file' | 'inject_comp' | '';

//@ts-nocheck

const data = reactive<{
  type: HandleType;
  block: 'ant';
  component?: string;
  docList: any;
  docActiveKey: any;
}>({
  type: '',
  block: 'ant',
  component: '',
  docList: {},
  docActiveKey: '',
});

onMounted(() => {
  fetch(`${locationOrigin}/web-devtools/getMenu`)
    .then(res => res.json())
    .then(res => {
      data.docList = res;
    });
});

let previosDom: HTMLElement | null = null;

const handleAimClick = (e: SVGElementEventMap['click']) => {
  e.stopPropagation();
  data.type = 'inspect_file';
  // 关闭弹窗，同时打开 瞄准模式
  emit('changeVisibile', { visibile: false, isAimStatus: true });
  document.body.addEventListener<'mousemove'>('mousemove', inspectComponent, false);
};

// document mouse 事件添加遮罩层样式
const inspectComponent = async (e: HTMLElementEventMap['mousemove']) => {
  e.stopPropagation();
  const targetDom = e.target as HTMLElement | null;
  if (targetDom && targetDom !== previosDom) {
    previosDom?.classList.remove('__layer-dev-tool');
    targetDom.classList.add('__layer-dev-tool');
    previosDom = targetDom;
  }
};

const documentHandleClick = async (e: HTMLElementEventMap['click']) => {
  e.stopPropagation();
  try {
    const targetDom = e.target as HTMLElement | null;
    emit('changeVisibile', { visibile: false, isAimStatus: false });

    const filePath = targetDom?.getAttribute('__p');

    if (data.type === 'inspect_file') {
      await fetch(`${locationOrigin}/web-devtools/launchEditor`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath }),
      });
    } else {
      await fetch(`${locationOrigin}/web-devtools/injectFile`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filePath,
          type: 'button',
          component: data.component,
          componentType: 'ant',
        }),
      });
    }
  } finally {
    previosDom?.classList.remove('__layer-dev-tool');
    data.component = '';
    data.type = '';
  }
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
    <div class="header">
      <div class="red"></div>
      <div class="yellow"></div>
      <div class="green"></div>
    </div>
    <div class="layout">
      <Menus />
      <Slider />
      <Page />
    </div>
  </div>
</template>

<style scoped>
#dev-tools-drawer {
  position: fixed;
  top: 20%;
  bottom: 150px;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  flex-direction: column;
  width: 800px;
  min-height: 300px;
  color: rgba (255, 255, 255, 0.65);
  font-size: 14px;
  background-color: var(--c-bg);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 20px 25px -5px, rgba(0, 0, 0, 0.04) 0 10px 10px -5px;
  will-change: top;
}
.header {
  display: flex;
  align-items: center;
  /* border-bottom: 1px solid rgba(0,0,0,.1); */
  background-color: var(--c-bg);
  user-select: none;
  padding: 0 2rem;
  height: var(--top-header-height);
}
.red {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #ff716a;
  border-radius: 50%;
  margin-right: 5px;
}
.yellow {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #fbc449;
  border-radius: 50%;
  margin-right: 5px;
}
.green {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #48cd56;
  border-radius: 50%;
}
.aim-icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
.header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.layout {
}
</style>

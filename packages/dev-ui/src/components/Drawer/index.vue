<script lang="ts" setup>
import { onMounted } from 'vue';
import AimIcon from '../../IconCompents/Aim.vue';
import DocRender from '../DocRender/index.vue';
import { watchEffect, reactive } from 'vue';
import { prefix } from '../../utils';

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
  fetch(`${prefix}/web-devtools/getMenu`)
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
      await fetch(`${prefix}/web-devtools/launchEditor`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filePath }),
      });
    } else {
      await fetch(`${prefix}/web-devtools/injectFile`, {
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
    <div class="header">Dev-plugin</div>
    <div class="content">
      <ul class="slides">
        <li
          v-for="(value, key, index) in data.docList"
          :key="index"
          :class="`slide-menu ${data.block === 'ant' && 'active'}`"
          @click="data.docActiveKey = key"
        >
          {{ key }}
        </li>
      </ul>
      <div class="inner-content">
        <DocRender :docContent="data.docList[data.docActiveKey]" />
      </div>
    </div>
    <div class="footer">
      <AimIcon class="aim-icon" title="组件定位" @click="handleAimClick"></AimIcon>
    </div>
  </div>
</template>

<style scoped>
#dev-tools-drawer {
  position: fixed;
  top: 30%;
  bottom: 150px;
  left: 50%;
  display: flex;
  transform: translateX(-50%);
  flex-direction: column;
  width: 700px;
  min-height: 300px;
  color: rgba (255, 255, 255, 0.65);
  font-size: 14px;
  background-color: #23232e;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 20px 25px -5px, rgba(0, 0, 0, 0.04) 0 10px 10px -5px;
  will-change: transform;
}
.header,
.footer {
  height: 30px;
  padding: 5px 10px;
  color: #fff;
  line-height: 30px;
  background-color: #30303d;
  user-select: none;
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
  display: flex;
  flex: 1;
}
.slides {
  display: flex;
  flex-direction: column;
  width: 70px;
  margin: 0;
  padding: 0;
  color: #fff;
  list-style: none;
  border-right: 1px solid #30303d;
}
.slide-menu {
  height: 40px;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}
.slide-menu:hover,
.active {
  background-color: #30303d;
}
.inner-content {
  flex: 1;
  overflow-y: auto;
}
</style>

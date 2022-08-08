<script lang="ts" setup>
import G6 from '@antv/g6';
import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';

const container = ref();

const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  fixToNode: [1, 0.5],
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node', 'edge'],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e: any) => {
    const outDiv = document.createElement('div');
    // outDiv.style.width = 'fit-content';
    // outDiv.style.height = 'fit-content';
    const model = e.item.getModel();
    if (e.item.getType() === 'node') {
      outDiv.innerHTML = `${model.name}`;
    } else {
      const source = e.item.getSource();
      const target = e.item.getTarget();
      outDiv.innerHTML = `来源：${source.getModel().name}<br/>去向：${target.getModel().name}`;
    }
    return outDiv;
  },
});

onMounted(async () => {
  const res = await useFetch(
    `http://localhost:${(window as any)._port}/web-devtools/analysisFile`,
    { method: 'GET' },
  ).json();
  const data = res?.data?.value?.data;

  const width = container.value.scrollWidth;
  const height = container.value.scrollHeight || 500;

  const graph = new G6.Graph({
    container: container.value,
    width,
    height,
    modes: {
      default: ['drag-canvas', 'drag-node'],
    },
    plugins: [tooltip],
    layout: {
      type: 'fruchterman',
      gravity: 10,
      speed: 5,
      // for rendering after each iteration
      tick: () => {
        graph.refreshPositions();
      },
    },
    animate: false,
    defaultNode: {
      size: 40,
    },
  }).on('node:click', (e) => {
    console.log(e);
  });

  graph.data(data || {});
  graph.render();
});
</script>

<template>
  <div class="dialog-bg">
    <div class="dialog-wrap" ref="container"></div>
  </div>
</template>
<style lang="less" scoped>
.dialog-bg {
  width: 100%;
  height: 100%;

  .dialog-wrap {
    width: 100%;
    height: 100%;
  }

  .g6-component-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #000;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }
}
</style>

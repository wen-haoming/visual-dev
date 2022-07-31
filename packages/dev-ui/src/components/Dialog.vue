<script lang="ts" setup>
import G6 from '@antv/g6';
import { ref, onMounted } from 'vue';

const analysisPluginData = {
  nodes: [
    { id: '/src/index.js', label: '/src/index.js' },
    { id: '/src/reportWebVitals.js', label: '/src/reportWebVitals.js' },
    { id: '/src/index.css', label: '/src/index.css' },
    { id: '/src/App.jsx', label: '/src/App.jsx' },
    { id: '/src/App.css', label: '/src/App.css' },
    { id: '/src/b.jsx', label: '/src/b.jsx' },
    { id: '/src/Form.jsx', label: '/src/Form.jsx' },
    { id: '/src/Pages/PageA/index.jsx', label: '/src/Pages/PageA/index.jsx' },
    { id: '/src/Pages/PageB/index.jsx', label: '/src/Pages/PageB/index.jsx' },
  ],
  edges: [
    { source: '/src/index.js', target: '/src/reportWebVitals.js' },
    { source: '/src/index.js', target: '/src/index.css' },
    { source: '/src/index.js', target: '/src/App.jsx' },
    { source: '/src/index.css', target: '/src/index.css' },
    { source: '/src/App.jsx', target: '/src/App.css' },
    { source: '/src/App.jsx', target: '/src/b.jsx' },
    { source: '/src/App.jsx', target: '/src/Form.jsx' },
    { source: '/src/App.jsx', target: '/src/Pages/PageA/index.jsx' },
    { source: '/src/App.jsx', target: '/src/Pages/PageB/index.jsx' },
    { source: '/src/App.css', target: '/src/App.css' },
  ],
};

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
  getContent: (e) => {
    const outDiv = document.createElement('div');
    outDiv.style.width = 'fit-content';
    outDiv.style.height = 'fit-content';
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

onMounted(() => {
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

  graph.data(analysisPluginData);
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
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.2);

  .dialog-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 500px;
    background-color: #fff;
    border-radius: 10px;
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

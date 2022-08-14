<script lang="ts" setup>
import G6 from '@antv/g6';
import { ref, onMounted } from 'vue';
import { useFetch } from '@vueuse/core';
import { launchEditor } from '../../utils';
import { dataTest } from './test.ts';

const container = ref();

// const globalFontSize = 12;
// const fittingString = (str:string, maxWidth:number, fontSize:number) => {
//   let currentWidth = 0;
//   let res = str;
//   const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
//   str.split('').forEach((letter, i) => {
//     if (currentWidth > maxWidth) return;
//     if (pattern.test(letter)) {
//       // Chinese charactors
//       currentWidth += fontSize;
//     } else {
//       // get the width of single letter according to the fontSize
//       currentWidth += G6.Util.getLetterWidth(letter, fontSize);
//     }
//     if (currentWidth > maxWidth) {
//       res = `${str.substr(0, i)}\n${str.substr(i)}`;
//     }
//   });
//   return res;
// };

const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 10,
  fixToNode: [1, 0.5],
  trigger: 'click',
  // the types of items that allow the tooltip show up
  // 允许出现 tooltip 的 item 类型
  itemTypes: ['node', 'edge'],
  // custom the tooltip's content
  // 自定义 tooltip 内容
  getContent: (e: any) => {
    const outDiv = document.createElement('div');
    const model = e.item.getModel();

    if (e.item.getType() === 'node') {
      const url = launchEditor({
        srcPath: model.name,
        editor: 'vscode',
        column: 0,
        line: 0,
      });
      outDiv.innerHTML = `<a href="${url}" target="_blank">点击打开源码位置</a> `;
      // outDiv.onclick = ()=>{

      //   //  window.open(url)
      // }
    } else {
      const source = e.item.getSource();
      const target = e.item.getTarget();
      outDiv.innerHTML = `来源：${source.getModel().name}<br/>去向：${target.getModel().name}`;
    }
    return outDiv;
  },
  nodeStateStyles: {
    hover: {
      lineWidth: 2,
      stroke: '#1890ff',
      fill: '#e6f7ff',
    },
  },
});

const toolbar = new G6.ToolBar({
  // position: { x: 10, y: 10 },
  container: container.value,
});

onMounted(async () => {
  // const res = await useFetch(
  //   `http://localhost:${(window as any)._port}/web-devtools/analysisFile`,
  //   { method: 'GET' },
  // ).json();

  // let data = res?.data?.value?.data;
  let data = dataTest.data;

  const width = container.value.scrollWidth;
  const height = container.value.scrollHeight || 500;

  const graph = new G6.Graph({
    container: container.value,
    width,
    height,
    modes: {
      default: ['drag-canvas', 'drag-node'],
    },
    plugins: [tooltip, toolbar],
    layout: {
      type: 'dagre',
      rankdir: 'LR', // 可选，默认为图的中心
      align: 'DL', // 可选
      nodesep: 10, // 可选
      ranksep: 50, // 可选
      controlPoints: true, // 可
    },
    animate: true,
    defaultNode: {
      type: 'modelRect',
      size: [150, 50],
    },
  });

  graph.data(data || {});
  graph.render();

  window.onresize = () => {
    if (!graph || graph.get('destroyed')) return;
    if (!container.value || !container.value.scrollWidth || !container.value.scrollHeight) return;
    graph.changeSize(container.value.scrollWidth, container.value.scrollHeight);
  };
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

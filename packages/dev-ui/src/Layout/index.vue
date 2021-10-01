<script lang="ts" setup>
import Menus from './components/Menus/index.vue';
import Page from './components/Page/index.vue';
import Slider from './components/Slider/index.vue';
</script>
<template>
  <div id="dev-tools-drawer">
    <div class="top-header">
      <div class="red"></div>
      <div class="yellow"></div>
      <div class="green"></div>
    </div>
    <Menus />
    <Slider />
    <Page />
  </div>
</template>

<style scoped>
#dev-tools-drawer {
  position: fixed;
  top: 10%;
  bottom: 150px;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 800px;
  min-height: 500px;
  color: rgba (255, 255, 255, 0.65);
  font-size: 14px;
  background-color: var(--c-bg);
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 20px 25px -5px, rgba(0, 0, 0, 0.04) 0 10px 10px -5px;
  box-shadow: var(--shadow-3);
  transform: translateX(-50%);
  will-change: top;
}
.top-header {
  display: flex;
  align-items: center;
  height: var(--top-header-height);
  padding: 0 1rem;
  background-color: var(--c-bg);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  user-select: none;
}
.red {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  background-color: #ff716a;
  border-radius: 50%;
}
.yellow {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  background-color: #fbc449;
  border-radius: 50%;
}
.green {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: #48cd56;
  border-radius: 50%;
}
</style>

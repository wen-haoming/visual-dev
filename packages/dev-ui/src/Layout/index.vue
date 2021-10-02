<script lang="ts" setup>
import Nav from './Nav.vue';
import { useRoute } from '../hooks';

const routes = useRoute();
</script>
<template>
  <div id="dev-tools-drawer">
    <div class="top-header">
      <div class="red"></div>
      <div class="yellow"></div>
      <div class="green"></div>
    </div>
    <Nav />
    <div class="l-page">
      <Component :is="routes?.currentRoute.component" />
    </div>
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
.l-page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-top: calc(var(--top-header-height) + var(--header-height));
  /* padding-left: var(--sider-bar); */
}
</style>

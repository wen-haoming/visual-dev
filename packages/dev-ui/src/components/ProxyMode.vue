<script lang="ts" setup>
import { reactive } from 'vue';
import { usePrefix } from '../hooks';
import ProxyIcon from '../IconCompents/Proxy.vue';
const prefix = usePrefix('proxy');

const data = reactive({
  show: false,
});
</script>

<template>
  <div :class="prefix">
    <ProxyIcon @click="data.show = !data.show" />
    <div :class="`${prefix}-drawer`">
      <div :class="`${prefix}-row`">
        <span>/abc</span>
        <select name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@import '../style/vars.less';
.@{prefix-cls}-proxy {
  position: relative;
  display: flex;
  align-items: center;
  &-drawer {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: -200px;
    left: 150px;
    width: 250px;
    height: 200px;
    margin-left: -25px;
    background-color: red;
    background-color: #f2f3f5;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;
    font-size: 14px;
  }
  &-row {
    padding: 5px;
  }
}
</style>

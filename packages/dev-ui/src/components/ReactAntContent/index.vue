<script lang="ts" setup>
import dataJson from './data.json';
console.log(dataJson);
</script>
<template>
  <div class="ant-wrapper">
    <div class="item" v-for="item in dataJson" :key="item.name">{{ item.name }}</div>
  </div>
</template>

<style lang="less" scoped>
.ant-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 10px;
  background-color: #30303d;

  .item {
    padding: 8px 5px;
    color: #fff;
    text-align: center;
    background: #23232e;
    border-radius: 2px;
    cursor: pointer;
  }
}
</style>

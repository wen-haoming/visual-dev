<template>
  <a-layout class="layout" style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="data.collapsed" collapsible>
      <div class="logo">
        <span class="logo-l" v-if="!data.collapsed">visual</span>
        <span class="logo-r" v-if="!data.collapsed">dev</span>
        <a class="git-hub-logo" href="https://github.com/wen-haoming/visual-dev">
          <github-outlined style="color: #fff; font-size: 18px" />
        </a>
      </div>
      <a-menu v-model:selectedKeys="data.selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/">
            <read-outlined />
            <span>READEME</span>
          </router-link>
        </a-menu-item>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <apartment-outlined />
              <span>components</span>
            </span>
          </template>
          <router-link to="/components/a">
            <a-menu-item key="6">Component A</a-menu-item>
          </router-link>
          <router-link to="/components/b">
            <a-menu-item key="8">Component B</a-menu-item>
          </router-link>
        </a-sub-menu>
        <a-menu-item key="file">
          <router-link to="/file">
            <partition-outlined />
            <span>File</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="display: flex; flex-direction: column">
      <a-layout-header style="background: #fff; padding: 0" />
      <a-layout-content style="margin: 5px 5px; flex: 1; background-color: #fff">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  ReadOutlined,
  ApartmentOutlined,
  PartitionOutlined,
  GithubOutlined,
} from '@ant-design/icons-vue';
import { reactive } from 'vue';
const data = reactive({
  collapsed: false,
  selectedKeys: [],
});
</script>
<style lang="less" scoped>
.layout {
  .logo {
    display: flex;
    height: 32px;
    margin: 16px;
    line-height: 32px;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #fff;

    .logo-l {
      display: inline-block;
      padding: 1px 7px;
      background-color: #fff;
      border-radius: 2px;
      color: @primary-color;
      margin-right: 5px;
    }

    .logo-r {
      display: inline-block;
      color: #fff;
      margin-right: 10px;
    }

    .git-hub-logo {
      display: inline-block;
    }
  }

  :deep(.ant-layout-sider-trigger) {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
}

.site-layout .site-layout-background {
  background: #fff;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>

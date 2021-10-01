<script lang="ts" setup>
import { onMounted, inject, watchEffect, reactive } from 'vue';
import { getRequest } from '../../../utils';

const pagesData: any = inject('usePages');
const data = reactive({
  key1: '',
  key2: '',
});
onMounted(() => {
  getRequest('web-devtools/getMenu').then((res: any) => {
    pagesData.sliderObject = res;
  });
});

watchEffect(() => {
  const [key1, key2] = pagesData.sliderKeys.split('-');
  data.key1 = key1;
  data.key2 = key2;
});
</script>
<template>
  <aside class="l-aside">
    <ul class="l-links">
      <li class="l-link">
        <p class="sidebar-link-item">components</p>
      </li>
      <ul class="sidebar-links" :key="index" v-for="(value, key, index) in pagesData.sliderObject">
        <li :class="typeof value !== 'object' ? 'sidebar-link' : 'sidebar-link2'">
          <a
            :class="data.key1 === key && 'sidebar-item-active'"
            @click="
              () => {
                if (typeof value !== 'object') {
                  pagesData.sliderKeys = `${String(key)}`;
                }
              }
            "
            >{{ key }}</a
          >
        </li>
        <ul
          class="sidebar-children"
          :key="`${index}-${index2}`"
          v-for="(itemValue, itemKey, index2) in value"
        >
          <li
            class="sidebar-item"
            :class="data.key1 === key && data.key2 === itemKey && 'sidebar-item-active'"
          >
            <a @click="pagesData.sliderKeys = `${String(key)}-${String(itemKey)}`">{{ itemKey }}</a>
          </li>
        </ul>
      </ul>
    </ul>
  </aside>
</template>

<style lang="less" scoped>
.l-aside {
  position: absolute;
  top: calc(var(--top-header-height) + var(--header-height));
  bottom: 0;
  left: 0;
  z-index: var(--z-index);
  width: var(--sider-bar);
  border-right: 1px solid var(--c-divider);

  ul,
  li,
  p {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .l-links {
    padding-top: 0.5rem;
  }
  .sidebar-link-item {
    padding: 0.2rem 0 0.2rem 0.75rem;
    color: var(--c-text);
    font-weight: 600;
    font-size: 1.2rem;
  }
  .sidebar-link a,
  .sidebar-link2 a {
    position: relative;
    padding: 0.2rem 0 0.2rem 1.4rem;
    padding-top: 1rem;
    color: var(--c-text);
    font-weight: 500;
    font-size: 1.1rem;
  }
  .sidebar-link2 a {
    cursor: auto;
  }
  .sidebar-item a {
    position: relative;
    padding: 0.2rem 0 0.2rem 2.5rem;
    padding-top: 1rem;
    color: var(--c-text);
    font-weight: 500;
    font-size: 1rem;
  }
  .sidebar-link a,
  .sidebar-item a {
    &:hover {
      color: var(--c-brand-active);
      &::before {
        position: absolute;
        top: 0;
        left: 1px;
        display: block;
        width: 3px;
        height: 100%;
        background-color: var(--c-brand-active);
        content: '';
      }
    }
  }
  .sidebar-item-active a {
    color: var(--c-brand-active);
    &::before {
      position: absolute;
      top: 0;
      left: 1px;
      display: block;
      width: 3px;
      height: 100%;
      background-color: var(--c-brand-active);
      content: '';
    }
  }
}
</style>

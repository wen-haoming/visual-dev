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
  left: 0;
  width: var(--sider-bar);
  bottom: 0;
  border-right: 1px solid var(--c-divider);
  z-index: var(--z-index);

  ul,
  li,
  p {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .l-links {
    padding-top: 0.5rem;
  }
  .sidebar-link-item {
    padding: 0.2rem 0 0.2rem 0.75rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--c-text);
  }
  .sidebar-link a,
  .sidebar-link2 a {
    position: relative;
    padding-top: 1rem;
    padding: 0.2rem 0 0.2rem 1.4rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--c-text);
  }
  .sidebar-link2 a {
    cursor: auto;
  }
  .sidebar-item a {
    position: relative;
    padding-top: 1rem;
    padding: 0.2rem 0 0.2rem 2.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--c-text);
  }
  .sidebar-link a,
  .sidebar-item a {
    &:hover {
      color: var(--c-brand-active);
      &::before {
        content: '';
        display: block;
        position: absolute;
        left: 1px;
        top: 0;
        height: 100%;
        width: 3px;
        background-color: var(--c-brand-active);
      }
    }
  }
  .sidebar-item-active a {
    color: var(--c-brand-active);
    &::before {
      content: '';
      display: block;
      position: absolute;
      left: 1px;
      top: 0;
      height: 100%;
      width: 3px;
      background-color: var(--c-brand-active);
    }
  }
}
</style>

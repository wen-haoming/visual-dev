<script lang="ts" setup>
import Aim from '../components/Aim.vue';
import { useRoute } from '../hooks';

const router = useRoute();
</script>

<template>
  <header class="h-header">
    <div class="h-tt">
      <span class="t1">visual</span>
      <span class="t2">dev</span>
    </div>
    <nav class="h-nav">
      <div
        @click="router?.changeCurrentRoute(route)"
        class="nav-item"
        :class="router?.currentRoute.route === route.route && 'active'"
        :key="route.route"
        v-for="route in router?.routes"
      >
        <span class="nav-text">{{ route.route }}</span>
      </div>
      <div class="nav-item">
        <Aim />
      </div>
    </nav>
  </header>
</template>

<style scoped lang="less">
.h-header {
  position: absolute;
  top: 31px;
  top: var(--top-header-height);
  left: 0;
  z-index: var(--z-index);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: var(--header-height);
  padding: 0 2rem;
  border-bottom: 1px solid var(--c-divider);
  .h-tt {
    color: var(--c-brand);
    user-select: none;
    .t1 {
      color: rgba(32, 130, 166, 1);
      font-weight: 600;
      font-size: 1.3rem;
    }
    .t2 {
      margin-left: 0.2rem;
      font-weight: 500;
      font-size: 1rem;
    }
  }
  .h-nav {
    display: flex;
    align-items: center;
    color: var(--c-text);
    .nav-item {
      padding-left: 15px;
      line-height: 1;
      &.active {
        color: var(--c-brand-active);
      }
      .nav-text {
        cursor: pointer;
      }
      .button-arrow {
        display: inline-block;
        margin-top: -1px;
        margin-left: 5px;
        vertical-align: middle;
        border-top: 6px solid rgb(204, 204, 204);
        border-right: 4px solid transparent;
        border-bottom: 0px;
        border-left: 4px solid transparent;
      }
    }
  }
}
</style>

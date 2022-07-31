import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    component: () => import('@/pages/readme/index.vue'),
  },
  {
    path: '/file',
    component: () => import('@/pages/File/index.vue'),
  },
  {
    path: '/components',
    children: [
      {
        path: '/components/a',
        component: () => import('@/pages/components/A/index.vue'),
      },
      {
        path: '/components/b',
        component: () => import('@/pages/components/B/index.vue'),
      },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
});

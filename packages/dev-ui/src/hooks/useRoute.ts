import { defineAsyncComponent, reactive, provide, inject, shallowRef } from 'vue';

export const useRouteNamespace = 'useRoute';

interface Route {
  route: string;
  component: any;
}

const routeData = reactive({
  routes: [
    {
      route: 'docs',
      component: shallowRef(defineAsyncComponent(() => import('../Pages/Docs/index.vue'))),
    },
    {
      route: 'setting',
      component: shallowRef(defineAsyncComponent(() => import('../Pages/Setting/index.vue'))),
    },
  ],
  currentRoute: {
    route: '',
    component: null,
  },
  changeCurrentRoute(route: Route) {
    this.currentRoute = route;
  },
});

export const createRouteContext = () => {
  provide(useRouteNamespace, routeData);
  routeData.currentRoute = routeData.routes[0] as any;
};

export const useRoute = () => {
  return inject<typeof routeData>(useRouteNamespace);
};

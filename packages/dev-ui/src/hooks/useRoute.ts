import { reactive, provide, inject } from 'vue';

export const useRouteNamespace = 'useRoute';

interface Route {
  route: string;
  component: any;
}

const rawData = {
  routes: [
    {
      route: 'Docs',
      // component: shallowRef(defineAsyncComponent(() => import('../Pages/Docs/index.vue'))),
    },
  ],
  currentRoute: {
    route: '',
    component: null,
  },
  changeCurrentRoute(route: Route) {
    this.currentRoute = route;
  },
};

export const createRouteContext = () => {
  const data = reactive(rawData);
  data.currentRoute = data.routes[0] as any;

  provide(useRouteNamespace, data);
  return data;
};

export const useRoute = () => {
  return inject<typeof rawData>(useRouteNamespace);
};

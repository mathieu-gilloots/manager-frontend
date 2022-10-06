/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}


declare module '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';
declare module '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js';

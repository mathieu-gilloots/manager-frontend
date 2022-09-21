import {createApp} from 'vue';
import {createPinia} from 'pinia';
import {createAuth} from '@websanova/vue-auth';
import driverAuthBearer from './includes/drivers/bearer.js';
import driverHttpAxios from '@websanova/vue-auth/dist/drivers/http/axios.1.x.esm.js';
import driverRouterVueRouter from '@websanova/vue-auth/dist/drivers/router/vue-router.2.x.esm.js';

import App from './App.vue';
import axios from 'axios';
import {createRouter, createWebHistory} from 'vue-router';
import {RouteRecordRaw} from 'vue-router';
import {setupLayouts} from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import {createI18n} from 'vue-i18n';

import {createHead} from '@vueuse/head';

import '@/styles/index.scss';

const routes: RouteRecordRaw[] = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();
const auth = createAuth({
  plugins: {
    http: axios,
    router: router
  },
  drivers: {
    http: driverHttpAxios,
    auth: driverAuthBearer,
    router: driverRouterVueRouter,
  },
  options: {
    rolesKey: 'type',
    notFoundRedirect: {name: 'user-account'},
    refreshTokenName: 'refresh_token',
    fetchData: {
      url: import.meta.env.VITE_BACKEND_API_ENDPOINT + '/me',
      enabled: true
    },
    refreshData: {
      enable: true,
      url: import.meta.env.VITE_BACKEND_API_ENDPOINT + '/token/refresh',
      method: 'POST',
    }
  }
});

import messages from '@intlify/vite-plugin-vue-i18n/messages';

const i18n = createI18n({
  locale: navigator.language,
  legacy: false,
  messages,
  globalInjection: true,
});

const head = createHead();

createApp(App).use(pinia).use(i18n).use(router).use(head).use(auth).mount('#app');

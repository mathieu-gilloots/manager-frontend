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

const shortLocale = navigator.language.substring(0 , 2);

const i18n = createI18n({
  locale: shortLocale,
  legacy: false,
  messages,
  globalInjection: true,
});

import { defineRule } from 'vee-validate';
import AllRules from '@vee-validate/rules';
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule]);
});


import { configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';

//TODO: find a way to import all json at once.
import fr from '@vee-validate/i18n/dist/locale/fr.json'
configure({
  generateMessage: localize({
    fr
  }),
});

import { setLocale } from '@vee-validate/i18n';
setLocale(shortLocale);

const head = createHead();

createApp(App).use(pinia).use(i18n).use(router).use(head).use(auth).mount('#app');

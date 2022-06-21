import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import { createRouter, createWebHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from 'virtual:generated-pages';
import { createI18n } from 'vue-i18n';

import { createHead } from '@vueuse/head';

import '@/styles/index.scss';

const routes: RouteRecordRaw[] = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();

import messages from '@intlify/vite-plugin-vue-i18n/messages';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
  globalInjection: true,
});

const head = createHead();

createApp(App).use(pinia).use(i18n).use(router).use(head).mount('#app');

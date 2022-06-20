import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => ({
    sidebarOpen: false,
    sidebarExpanded: true,
  }),
});

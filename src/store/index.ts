import { defineStore } from 'pinia';

const useStore = defineStore('store', {
  state: () => ({
    sidebarOpen: false,
    sidebarExpanded: true,
  }),
});

export default useStore;

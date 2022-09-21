<script setup lang="ts">

const store = useStore();
</script>
<script lang="ts">
export default {
  name: 'DefaultLayout',
};
</script>
<template>
  <div class="flex h-screen overflow-hidden">
    <!-- Sidebar -->
    <sidebar @close-sidebar="store.$state.sidebarOpen = false" />

    <!-- Content area -->
    <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <!-- Site header -->
      <app-header @toggle-sidebar="store.$state.sidebarOpen = !store.$state.sidebarOpen" />

      <main>
        <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <router-view />

          <!-- Welcome banner -->
          <!--					<WelcomeBanner />-->
        </div>
      </main>

      <!--			<Banner />-->
    </div>
  </div>
</template>

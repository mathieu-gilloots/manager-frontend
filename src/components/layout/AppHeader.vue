<script setup lang="ts">
defineEmits(['toggle-sidebar']);

const store = useStore();

// const { availableLocales } = useI18n();

const preferedDark = usePreferredDark();
const isDark = useStorage('isDark', preferedDark.value);
const body = ref<HTMLBodyElement | null>(null);

// const toggleDarkMode = () => {
//   if (body.value) {
//     if (isDark.value) {
//       body.value.classList.remove('dark');
//     } else {
//       body.value.classList.add('dark');
//     }
//   }
//   isDark.value = !isDark.value;
// };

onMounted(async () => {
  await nextTick();

  body.value = document.querySelector('body') as HTMLBodyElement;
  if (body.value) {
    if (isDark.value) body.value.classList.add('dark');
  }
});
</script>

<template>
  <header class="sticky top-0 bg-white border-b border-gray-200 z-30">
    <div class="px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 -mb-px">
        <!-- Header: Left side -->
        <div class="flex">
          <!-- Hamburger button -->
          <button
            class="text-gray-500 hover:text-gray-600 lg:hidden"
            aria-controls="sidebar"
            :aria-expanded="store.$state.sidebarOpen"
            @click.stop="$emit('toggle-sidebar')"
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>
        </div>

        <!-- Header: Right side -->
        <div class="flex items-center space-x-3">
          <dropdown-notifications align="right" />
          <dropdown-help align="right" />
          <!-- <button
            class="mx-5 cursor-pointer focus:outline-none"
            @click="toggleDarkMode"
          >
            <icon:bx:bx-moon class="w-6 h-6" v-if="!isDark" />
            <icon:bx:bxs-moon class="w-6 h-6" v-else />
          </button> -->
          <!-- Divider -->
          <hr class="w-px h-6 bg-gray-200" />
          <dropdown-profile align="right" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>

<template>
  <div class="relative inline-flex">
    <button
      ref="trigger"
      class="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition duration-150 rounded-full"
      :class="{ 'bg-gray-200': dropdownOpen }"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="sr-only">Notifications</span>
      <icon:fa-regular:bell />
      <div
        class="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"
      ></div>
    </button>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-show="dropdownOpen"
        class="origin-top-right z-10 absolute top-full -mr-48 sm:mr-0 min-w-80 bg-white border border-gray-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        :class="align === 'right' ? 'right-0' : 'left-0'"
      >
        <div class="text-xs font-semibold text-gray-400 uppercase pt-1.5 pb-2 px-4">
          Notifications
        </div>
        <ul ref="dropdown" @focusin="dropdownOpen = true" @focusout="dropdownOpen = false">
          <li class="border-b border-gray-200 last:border-0">
            <router-link
              class="block py-2 px-4 hover:bg-gray-50"
              to="#0"
              @click="dropdownOpen = false"
            >
              <span class="block text-sm mb-2"
                >📣
                <span class="font-medium text-gray-800">Edit your information in a swipe</span> Sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim.</span
              >
              <span class="block text-xs font-medium text-gray-400">Feb 12, 2021</span>
            </router-link>
          </li>
          <li class="border-b border-gray-200 last:border-0">
            <router-link
              class="block py-2 px-4 hover:bg-gray-50"
              to="#0"
              @click="dropdownOpen = false"
            >
              <span class="block text-sm mb-2"
                >📣
                <span class="font-medium text-gray-800">Edit your information in a swipe</span> Sint
                occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim.</span
              >
              <span class="block text-xs font-medium text-gray-400">Feb 9, 2021</span>
            </router-link>
          </li>
          <li class="border-b border-gray-200 last:border-0">
            <router-link
              class="block py-2 px-4 hover:bg-gray-50"
              to="#0"
              @click="dropdownOpen = false"
            >
              <span class="block text-sm mb-2"
                >🚀<span class="font-medium text-gray-800">Say goodbye to paper receipts!</span>
                Sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim.</span
              >
              <span class="block text-xs font-medium text-gray-400">Jan 24, 2020</span>
            </router-link>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DropdownNotifications',
  props: ['align'],
  setup() {
    const dropdownOpen = ref(false);
    const trigger = ref(null);
    const dropdown = ref(null);

    // close on click outside
    const clickHandler = ({ target }) => {
      if (!dropdownOpen.value || dropdown.value.contains(target) || trigger.value.contains(target))
        return;
      dropdownOpen.value = false;
    };

    // close if the esc key is pressed
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen.value || keyCode !== 27) return;
      dropdownOpen.value = false;
    };

    onMounted(() => {
      document.addEventListener('click', clickHandler);
      document.addEventListener('keydown', keyHandler);
    });

    onUnmounted(() => {
      document.removeEventListener('click', clickHandler);
      document.removeEventListener('keydown', keyHandler);
    });

    return {
      dropdownOpen,
      trigger,
      dropdown,
    };
  },
};
</script>

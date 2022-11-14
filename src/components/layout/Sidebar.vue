<template>
  <div>
    <!-- Sidebar backdrop (mobile only) -->
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
      :class="store.$state.sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-hidden="true"
    />

    <!-- Sidebar -->
    <div
      id="sidebar"
      ref="sidebar"
      class="flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out"
      :class="store.$state.sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
    >
      <!-- Sidebar header -->
      <div class="flex justify-between mb-10 pr-3 sm:px-2">
        <!-- Close button -->
        <button
          ref="trigger"
          class="lg:hidden text-gray-500 hover:text-gray-400"
          aria-controls="sidebar"
          :aria-expanded="store.$state.sidebarOpen"
          @click.stop="$emit('close-sidebar')"
        >
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="block" to="/">
          <img :src="ITMGLogo32" alt="ITMG Logo" />
        </router-link>
      </div>

      <!-- Links -->
      <div class="space-y-8">
        <!-- Pages group -->
        <div>
          <h3 class="text-xs uppercase text-gray-500 font-semibold pl-3">
            <span
              class="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              aria-hidden="true"
              >•••</span
            >
            <span class="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
          </h3>
          <ul class="mt-3">
            <!-- Dashboard -->
            <router-link v-slot="{ href, navigate, isExactActive }" to="/" custom>
              <li
                class="px-3 py-2 rounded-sm mb-0.5 last:mb-0"
                :class="isExactActive && 'bg-gray-900'"
              >
                <a
                  class="block text-gray-200 hover:text-white truncate transition duration-150"
                  :class="isExactActive && 'hover:text-gray-200'"
                  :href="href"
                  @click="navigate"
                >
                  <div class="flex items-center">
                    <svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                      <path
                        class="fill-current text-gray-400"
                        :class="isExactActive && '!text-indigo-500'"
                        d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                      />
                      <path
                        class="fill-current text-gray-600"
                        :class="isExactActive && 'text-indigo-600'"
                        d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                      />
                      <path
                        class="fill-current text-gray-400"
                        :class="isExactActive && 'text-indigo-200'"
                        d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                      />
                    </svg>
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Dashboard</span
                    >
                  </div>
                </a>
              </li>
            </router-link>
            <!-- Settings -->
            <sidebar-link-group
              v-slot="parentLink"
              :active-condition="ACCOUNT_ROUTES_NAME.includes(currentRoute.name)"
            >
              <a
                class="block text-gray-200 hover:text-white truncate transition duration-150"
                :class="ACCOUNT_ROUTES_NAME.includes(currentRoute.name) && 'hover:text-gray-200'"
                href="#"
                @click.prevent="
                  store.$state.sidebarExpanded
                    ? parentLink.handleClick()
                    : (store.$state.sidebarExpanded = true)
                "
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <icon:fa-user-o style="font-size: 1.25em" />
                    <span
                      class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                      >Mon Compte</span
                    >
                  </div>
                  <!-- Icon -->
                  <div class="flex shrink-0 ml-2">
                    <svg
                      class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400"
                      :class="parentLink.expanded && 'transform rotate-180'"
                      viewBox="0 0 12 12"
                    >
                      <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                    </svg>
                  </div>
                </div>
              </a>
              <div class="lg:hidden lg:sidebar-expanded:block 2xl:block">
                <ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">
                  <router-link
                    v-slot="{ href, navigate, isExactActive }"
                    :to="{ name: 'user_view', params: { uuid: auth.user().uuid } }"
                    custom
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
                        :class="isExactActive && '!text-indigo-500'"
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >{{ $t('common.settings') }}</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    v-slot="{ href, navigate, isExactActive }"
                    :to="{ name: 'customer_view', params: { uuid: auth.user().customer.uuid } }"
                    custom
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
                        :class="isExactActive && '!text-indigo-500'"
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >{{ $t('sidebar.my-account.company') }}</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link
                    v-slot="{ href, navigate, isExactActive }"
                    :to="{
                      name: 'customer_invoice_view',
                      params: { customerUuid: auth.user().customer.uuid },
                    }"
                    custom
                  >
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
                        :class="isExactActive && '!text-indigo-500'"
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >{{ $t('sidebar.my-account.invoices') }}</span
                        >
                      </a>
                    </li>
                  </router-link>
                  <router-link v-slot="{ href, navigate }" to="/" custom>
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
                        :href="href"
                        @click="navigate"
                      >
                        <span
                          class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >{{ $t('sidebar.my-account.contracts') }}</span
                        >
                      </a>
                    </li>
                  </router-link>
                </ul>
              </div>
            </sidebar-link-group>
          </ul>
        </div>
      </div>

      <!-- Expand / collapse button -->
      <div class="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
        <div class="px-3 py-2">
          <button @click.prevent="store.$state.sidebarExpanded = !store.$state.sidebarExpanded">
            <span class="sr-only">Expand / collapse sidebar</span>
            <svg class="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
              <path
                class="text-gray-400"
                d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
              />
              <path class="text-gray-600" d="M3 23H1V1h2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ACCOUNT_ROUTES_NAME } from '../../includes/routing-utils';
import ITMGLogo32 from '../../assets/logo-32.png';

const store = useStore();
const auth = useAuth();

const trigger = ref<HTMLButtonElement>();
const sidebar = ref<HTMLDivElement>();

const currentRoute = useRouter().currentRoute.value;

const emit = defineEmits(['close-sidebar']);

// close on click outside
const clickHandler = ({ target }: { target: any }) => {
  if (!sidebar.value || !trigger.value) return;
  if (!store.$state.sidebarOpen || sidebar.value.contains(target) || trigger.value.contains(target))
    return;
  emit('close-sidebar');
};

// close if the esc key is pressed
const keyHandler = ({ keyCode }: { keyCode: Number }) => {
  if (!store.$state.sidebarOpen || keyCode !== 27) return;
  emit('close-sidebar');
};

onMounted(() => {
  document.addEventListener('click', clickHandler);
  document.addEventListener('keydown', keyHandler);
});

onUnmounted(() => {
  document.removeEventListener('click', clickHandler);
  document.removeEventListener('keydown', keyHandler);
});

watch(
  () => store.sidebarExpanded,
  () => {
    const bodySelector = document.querySelector('body');
    if (bodySelector !== null) {
      if (store.$state.sidebarExpanded) {
        bodySelector.classList.add('sidebar-expanded');
      } else {
        bodySelector.classList.remove('sidebar-expanded');
      }
    }
  }
);
</script>

<script lang="ts">
export default {
  name: 'SidebarComponent',
};
</script>

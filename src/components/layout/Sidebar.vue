<template>
  <div>
    <!-- Sidebar backdrop (mobile only) -->
    <div
      class="fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200"
      :class="store.$state.sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      aria-hidden="true"
    ></div>

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
          @click.stop="$emit('close-sidebar')"
          aria-controls="sidebar"
          :aria-expanded="store.$state.sidebarOpen"
        >
          <span class="sr-only">Close sidebar</span>
          <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
          </svg>
        </button>
        <!-- Logo -->
        <router-link class="block" to="/">
          <img :src="ITMGLogo32" />
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
            <router-link to="/" custom v-slot="{ href, navigate, isExactActive }">
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
            <!-- Analytics -->
            <!--						<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--							<li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">-->
            <!--								<a class="block text-gray-200 hover:text-white truncate transition duration-150"-->
            <!--								   :href="href" @click="navigate">-->
            <!--									<div class="flex items-center">-->
            <!--										<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">-->
            <!--											<path class="fill-current text-gray-600" d="M0 20h24v2H0z"/>-->
            <!--											<path class="fill-current text-gray-400"-->
            <!--												  d="M4 18h2a1 1 0 001-1V8a1 1 0 00-1-1H4a1 1 0 00-1 1v9a1 1 0 001 1zM11 18h2a1 1 0 001-1V3a1 1 0 00-1-1h-2a1 1 0 00-1 1v14a1 1 0 001 1zM17 12v5a1 1 0 001 1h2a1 1 0 001-1v-5a1 1 0 00-1-1h-2a1 1 0 00-1 1z"/>-->
            <!--										</svg>-->
            <!--										<span-->
            <!--											class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Analytics</span>-->
            <!--									</div>-->
            <!--								</a>-->
            <!--							</li>-->
            <!--						</router-link>-->
            <!--						&lt;!&ndash; E-Commerce  &ndash;&gt;-->
            <!--						<sidebar-link-group v-slot="parentLink"-->
            <!--											:activeCondition="currentRoute.fullPath.includes('ecommerce')">-->
            <!--							<a class="block text-gray-200 hover:text-white truncate transition duration-150"-->
            <!--							   :class="currentRoute.fullPath.includes('ecommerce') && 'hover:text-gray-200'" href="#0"-->
            <!--							   @click.prevent="store.$state.sidebarExpanded ? parentLink.handleClick() : store.$state.sidebarExpanded = true">-->
            <!--								<div class="flex items-center justify-between">-->
            <!--									<div class="flex items-center">-->
            <!--										<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">-->
            <!--											<path class="fill-current text-gray-400"-->
            <!--												  :class="currentRoute.fullPath.includes('ecommerce') && 'text-indigo-300'"-->
            <!--												  d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"/>-->
            <!--											<path class="fill-current text-gray-700"-->
            <!--												  :class="currentRoute.fullPath.includes('ecommerce') && '!text-indigo-600'"-->
            <!--												  d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"/>-->
            <!--											<path class="fill-current text-gray-600"-->
            <!--												  :class="currentRoute.fullPath.includes('ecommerce') && 'text-indigo-500'"-->
            <!--												  d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"/>-->
            <!--										</svg>-->
            <!--										<span-->
            <!--											class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">E-Commerce </span>-->
            <!--									</div>-->
            <!--									&lt;!&ndash; Icon &ndash;&gt;-->
            <!--									<div class="flex shrink-0 ml-2">-->
            <!--										<svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400"-->
            <!--											 :class="parentLink.expanded && 'transform rotate-180'" viewBox="0 0 12 12">-->
            <!--											<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>-->
            <!--										</svg>-->
            <!--									</div>-->
            <!--								</div>-->
            <!--							</a>-->
            <!--							<div class="lg:hidden lg:sidebar-expanded:block 2xl:block">-->
            <!--								<ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Customers</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Orders</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Invoices</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Shop</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Shop 2</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Single Product</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Cart</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Cart 2</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Pay</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--								</ul>-->
            <!--							</div>-->
            <!--						</sidebar-link-group>-->
            <!--						&lt;!&ndash; Campaigns &ndash;&gt;-->
            <!--						<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--							<li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">-->
            <!--								<a class="block text-gray-200 hover:text-white truncate transition duration-150"-->
            <!--								   :href="href" @click="navigate">-->
            <!--									<div class="flex items-center">-->
            <!--										<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">-->
            <!--											<path class="fill-current text-gray-600"-->
            <!--												  d="M20 7a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 0120 7zM4 23a.75.75 0 01-.75-.75 1.5 1.5 0 00-1.5-1.5.75.75 0 110-1.5 1.5 1.5 0 001.5-1.5.75.75 0 111.5 0 1.5 1.5 0 001.5 1.5.75.75 0 110 1.5 1.5 1.5 0 00-1.5 1.5A.75.75 0 014 23z"/>-->
            <!--											<path class="fill-current text-gray-400"-->
            <!--												  d="M17 23a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 010-2 4 4 0 004-4 1 1 0 012 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1zM7 13a1 1 0 01-1-1 4 4 0 00-4-4 1 1 0 110-2 4 4 0 004-4 1 1 0 112 0 4 4 0 004 4 1 1 0 010 2 4 4 0 00-4 4 1 1 0 01-1 1z"/>-->
            <!--										</svg>-->
            <!--										<span-->
            <!--											class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Campaigns</span>-->
            <!--									</div>-->
            <!--								</a>-->
            <!--							</li>-->
            <!--						</router-link>-->
            <!--						&lt;!&ndash; Team &ndash;&gt;-->
            <!--						<sidebar-link-group v-slot="parentLink"-->
            <!--											:activeCondition="currentRoute.fullPath.includes('team')">-->
            <!--							<a class="block text-gray-200 hover:text-white truncate transition duration-150"-->
            <!--							   :class="currentRoute.fullPath.includes('team') && 'hover:text-gray-200'" href="#0"-->
            <!--							   @click.prevent="store.$state.sidebarExpanded ? parentLink.handleClick() : store.$state.sidebarExpanded = true">-->
            <!--								<div class="flex items-center justify-between">-->
            <!--									<div class="flex items-center">-->
            <!--										<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">-->
            <!--											<path class="fill-current text-gray-600"-->
            <!--												  :class="currentRoute.fullPath.includes('team') && 'text-indigo-500'"-->
            <!--												  d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"/>-->
            <!--											<path class="fill-current text-gray-400"-->
            <!--												  :class="currentRoute.fullPath.includes('team') && 'text-indigo-300'"-->
            <!--												  d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"/>-->
            <!--										</svg>-->
            <!--										<span-->
            <!--											class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Team</span>-->
            <!--									</div>-->
            <!--									&lt;!&ndash; Icon &ndash;&gt;-->
            <!--									<div class="flex shrink-0 ml-2">-->
            <!--										<svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400"-->
            <!--											 :class="parentLink.expanded && 'transform rotate-180'" viewBox="0 0 12 12">-->
            <!--											<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>-->
            <!--										</svg>-->
            <!--									</div>-->
            <!--								</div>-->
            <!--							</a>-->
            <!--							<div class="lg:hidden lg:sidebar-expanded:block 2xl:block">-->
            <!--								<ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Team - Tabs</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Team - Tiles</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Profile</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--								</ul>-->
            <!--							</div>-->
            <!--						</sidebar-link-group>-->
            <!--						&lt;!&ndash; Messages &ndash;&gt;-->
            <!--						<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--							<li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">-->
            <!--								<a class="block text-gray-200 hover:text-white truncate transition duration-150"-->
            <!--								   :href="href" @click="navigate">-->
            <!--									<div class="flex items-center">-->
            <!--										<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">-->
            <!--											<path class="fill-current text-gray-600"-->
            <!--												  d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"/>-->
            <!--											<path class="fill-current text-gray-400"-->
            <!--												  d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"/>-->
            <!--										</svg>-->
            <!--										<span-->
            <!--											class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Messages</span>-->
            <!--									</div>-->
            <!--								</a>-->
            <!--							</li>-->
            <!--						</router-link>-->
            <!--						&lt;!&ndash; Tasks &ndash;&gt;-->
            <!--						<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--							<li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">-->
            <!--								<a class="block text-gray-200 hover:text-white truncate transition duration-150"-->
            <!--								   :href="href" @click="navigate">-->
            <!--									<div class="flex items-center">-->
            <!--										<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">-->
            <!--											<path class="fill-current text-gray-600"-->
            <!--												  d="M8 1v2H3v19h18V3h-5V1h7v23H1V1z"/>-->
            <!--											<path class="fill-current text-gray-600" d="M1 1h22v23H1z"/>-->
            <!--											<path class="fill-current text-gray-400"-->
            <!--												  d="M15 10.586L16.414 12 11 17.414 7.586 14 9 12.586l2 2zM5 0h14v4H5z"/>-->
            <!--										</svg>-->
            <!--										<span-->
            <!--											class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Tasks</span>-->
            <!--									</div>-->
            <!--								</a>-->
            <!--							</li>-->
            <!--						</router-link>-->
            <!--						&lt;!&ndash; Inbox &ndash;&gt;-->
            <!--						<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--							<li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">-->
            <!--								<a class="block text-gray-200 hover:text-white truncate transition duration-150"-->
            <!--								   :href="href" @click="navigate">-->
            <!--									<div class="flex items-center">-->
            <!--										<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">-->
            <!--											<path class="fill-current text-gray-600"-->
            <!--												  d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"/>-->
            <!--											<path class="fill-current text-gray-400"-->
            <!--												  d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"/>-->
            <!--										</svg>-->
            <!--										<span-->
            <!--											class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Inbox</span>-->
            <!--									</div>-->
            <!--								</a>-->
            <!--							</li>-->
            <!--						</router-link>-->
            <!--						&lt;!&ndash; Calendar &ndash;&gt;-->
            <!--						<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--							<li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0">-->
            <!--								<a class="block text-gray-200 hover:text-white truncate transition duration-150"-->
            <!--								   :href="href" @click="navigate">-->
            <!--									<div class="flex items-center">-->
            <!--										<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">-->
            <!--											<path class="fill-current text-gray-600" d="M1 3h22v20H1z"/>-->
            <!--											<path class="fill-current text-gray-400"-->
            <!--												  d="M21 3h2v4H1V3h2V1h4v2h10V1h4v2Z"/>-->
            <!--										</svg>-->
            <!--										<span-->
            <!--											class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Calendar</span>-->
            <!--									</div>-->
            <!--								</a>-->
            <!--							</li>-->
            <!--						</router-link>-->
            <!-- Settings -->
            <sidebar-link-group
              v-slot="parentLink"
              :activeCondition="currentRoute.fullPath.includes('settings')"
            >
              <a
                class="block text-gray-200 hover:text-white truncate transition duration-150"
                :class="currentRoute.fullPath.includes('settings') && 'hover:text-gray-200'"
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
                  <router-link to="/" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                  <router-link to="/" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                  <router-link to="/" custom v-slot="{ href, navigate }">
                    <li class="mb-1 last:mb-0">
                      <a
                        class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"
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
                  <router-link to="/" custom v-slot="{ href, navigate }">
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
            <!--						&lt;!&ndash; Utility &ndash;&gt;-->
            <!--						<sidebar-link-group v-slot="parentLink"-->
            <!--											:activeCondition="currentRoute.fullPath.includes('utility')">-->
            <!--							<a class="block text-gray-200 hover:text-white truncate transition duration-150"-->
            <!--							   :class="currentRoute.fullPath.includes('utility') && 'hover:text-gray-200'" href="#0"-->
            <!--							   @click.prevent="store.$state.sidebarExpanded ? parentLink.handleClick() : store.$state.sidebarExpanded = true">-->
            <!--								<div class="flex items-center justify-between">-->
            <!--									<div class="flex items-center">-->
            <!--										<svg class="shrink-0 h-6 w-6" viewBox="0 0 24 24">-->
            <!--											<circle class="fill-current text-gray-400"-->
            <!--													:class="currentRoute.fullPath.includes('utility') && 'text-indigo-300'"-->
            <!--													cx="18.5" cy="5.5" r="4.5"/>-->
            <!--											<circle class="fill-current text-gray-600"-->
            <!--													:class="currentRoute.fullPath.includes('utility') && 'text-indigo-500'"-->
            <!--													cx="5.5" cy="5.5" r="4.5"/>-->
            <!--											<circle class="fill-current text-gray-600"-->
            <!--													:class="currentRoute.fullPath.includes('utility') && 'text-indigo-500'"-->
            <!--													cx="18.5" cy="18.5" r="4.5"/>-->
            <!--											<circle class="fill-current text-gray-400"-->
            <!--													:class="currentRoute.fullPath.includes('utility') && 'text-indigo-300'"-->
            <!--													cx="5.5" cy="18.5" r="4.5"/>-->
            <!--										</svg>-->
            <!--										<span-->
            <!--											class="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Utility</span>-->
            <!--									</div>-->
            <!--									&lt;!&ndash; Icon &ndash;&gt;-->
            <!--									<div class="flex shrink-0 ml-2">-->
            <!--										<svg class="w-3 h-3 shrink-0 ml-1 fill-current text-gray-400"-->
            <!--											 :class="parentLink.expanded && 'transform rotate-180'" viewBox="0 0 12 12">-->
            <!--											<path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>-->
            <!--										</svg>-->
            <!--									</div>-->
            <!--								</div>-->
            <!--							</a>-->
            <!--							<div class="lg:hidden lg:sidebar-expanded:block 2xl:block">-->
            <!--								<ul class="pl-9 mt-1" :class="!parentLink.expanded && 'hidden'">-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Changelog</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Roadmap</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">FAQs</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Empty State</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--									<router-link to="/" custom v-slot="{ href, navigate }">-->
            <!--										<li class="mb-1 last:mb-0">-->
            <!--											<a class="block text-gray-400 hover:text-gray-200 transition duration-150 truncate"-->
            <!--											   :href="href" @click="navigate">-->
            <!--												<span-->
            <!--													class="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">404</span>-->
            <!--											</a>-->
            <!--										</li>-->
            <!--									</router-link>-->
            <!--								</ul>-->
            <!--							</div>-->
            <!--						</sidebar-link-group>-->
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

import ITMGLogo32 from '../../assets/logo-32.png';

const store = useStore();

const trigger = ref<HTMLButtonElement>();
const sidebar = ref<HTMLDivElement>();

const currentRoute = useRouter().currentRoute.value;

const emit = defineEmits(['close-sidebar']);

// close on click outside
const clickHandler = ({ target }: {target: any}) => {
  if (!sidebar.value || !trigger.value) return;
  if (!store.$state.sidebarOpen || sidebar.value.contains(target) || trigger.value.contains(target))
    return;
  emit('close-sidebar');
};

// close if the esc key is pressed
const keyHandler = ({keyCode} : {keyCode: Number}) => {
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
    let bodySelector = document.querySelector('body');
    if(bodySelector !== null) {
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

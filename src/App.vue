<template>
  <RouterView v-slot="{ Component, route }">
    <transition name="slide">
      <component :is="Component" :key="route" />
    </transition>
  </RouterView>
</template>

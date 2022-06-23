<script setup lang="ts">

useHead({
  title: 'Dashboard | ITMG-Cloud',
});

const { t } = useI18n();

</script>

<script lang="ts">
export default {
  name: 'IndexPage',
};
</script>

<template>
  <div class="grid place-items-center min-h-[80vh]">
    <div>
      <p class="lg:text-left text-center">
        {{ t('intro.desc') }}
        <a href="https://tailwindcss.com/" class="text-blue-500 hover:underline">TailwindCSS</a>
        {{ $auth.user() }}
      </p>
      <p class="text-center">
        {{ t('intro.github') }}
        <a class="text-blue-500 hover:underline" href="https://github.com/zynth17/vitailse"
          >Github Repo</a
        >
      </p>
    </div>
  </div>
</template>

<route lang="json">
{
  "name": "home",
  "meta": {
    "auth": true
  }
}
</route>

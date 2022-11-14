<template>
  <li class="px-3 py-2 rounded-sm mb-0.5 last:mb-0" :class="activeCondition && 'bg-gray-900'">
    <slot :handle-click="handleClick" :expanded="expanded" />
  </li>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'SidebarLinkGroup',
  props: {
    activeCondition: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const expanded = ref(props.activeCondition);

    const handleClick = () => {
      expanded.value = !expanded.value;
    };

    return {
      expanded,
      handleClick,
    };
  },
};
</script>

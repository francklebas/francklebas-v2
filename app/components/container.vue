<script setup lang="ts">
withDefaults(defineProps<{ tag?: string; maxWidth?: number }>(), {
  tag: "div",
});
</script>

<template>
  <component
    :is="tag"
    class="pad-x"
    :style="
      maxWidth ? { maxWidth: `${maxWidth}px`, margin: '0 auto' } : undefined
    "
  >
    <slot />
  </component>
</template>

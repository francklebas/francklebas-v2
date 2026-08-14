<script setup lang="ts">
defineProps<{ show: boolean }>();
defineEmits<{ close: [] }>();
</script>

<template>
  <div v-if="show" class="map-modal" @click="$emit('close')">
    <div class="map-dialog" @click.stop>
      <div class="map-header">
        <span class="fr map-title">Marseille — 43.2965° N, 5.3698° E</span>
        <button
          class="map-close"
          type="button"
          aria-label="Close map"
          @click="$emit('close')"
        >
          ×
        </button>
      </div>
      <iframe
        src="https://www.google.com/maps?q=43.2965,5.3698&output=embed"
        width="100%"
        height="380"
        class="map-frame"
        loading="lazy"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    src: string
    size?: string
  }>(),
  { size: '1em' },
)
</script>

<template>
  <img
    :src="src"
    alt=""
    class="action-icon"
    :style="{ width: size, height: size }"
    aria-hidden="true"
  />
</template>

<style scoped>
.action-icon {
  display: block;
  flex-shrink: 0;
  object-fit: contain;
}
</style>

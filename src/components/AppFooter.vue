<script setup lang="ts">
import { APP_NAME } from '@/config'
import { readLoadedAppVersion } from '@/utils'

const appVersion = readLoadedAppVersion()
</script>

<template>
  <footer class="app-footer">
    <span class="app-footer__name">{{ APP_NAME }}</span>

    <template v-if="appVersion">
      <span class="app-footer__sep" aria-hidden="true">&bullet;</span>
      <span class="app-footer__version">v{{ appVersion }}</span>
    </template>
  </footer>
</template>

<style scoped>
.app-footer {
  position: fixed;
  bottom: 12px;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.375rem;
  padding: 0 1rem;
  font-size: 0.75rem;
  color: #666;
  text-transform: lowercase;
}

.app-footer__name,
.app-footer__version {
  color: #757575;
}

.app-footer__sep {
  color: #bdbdbd;
}
</style>

<script setup lang="ts">
import { useDocumentMeta } from '@/composables'
import { RedirectPanel } from '@/components'

useDocumentMeta()
</script>

<template>
  <RedirectPanel />
</template>

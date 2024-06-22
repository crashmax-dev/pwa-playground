<script setup lang="ts">
import { usePWA } from '@/composables/use-pwa';

const { isInstallProgress, triggerInstall } = usePWA()
</script>

<template>
  <button @click="triggerInstall">
    {{ isInstallProgress ? 'Установка...' : 'Установить' }}
  </button>
</template>

<script setup>
import { usePWA } from './usePWA';

const { isInstallProgress, triggerInstall } = usePWA()
</script>

<template>
  <button @click="triggerInstall" type="button">
    {{ isInstallProgress ? 'Installing PWA...' : 'Install PWA' }}
  </button>
</template>

<script setup>
import PWAWelcome from './PWAWelcome.vue'
import PWAInstallButton from './PWAInstallButton.vue'
import { usePWA } from './usePWA'

const { isDownloaded, isInstalled } = usePWA()
</script>

<template>
  <div class="card">
    <PWAWelcome v-if="isDownloaded">
      Thanks for installing 🎉
    </PWAWelcome>
    <PWAWelcome v-else-if="isInstalled">
      Hello PWA
    </PWAWelcome>
    <PWAInstallButton v-else />
  </div>
</template>

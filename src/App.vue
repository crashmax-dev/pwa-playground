<script setup>
import PWAWelcome from './PWAWelcome.vue'
import PWAInstallButton from './PWAInstallButton.vue'
import { usePWA } from './usePWA'

const { isInstalled } = usePWA()
</script>

<template>
  <div class="card">
    <PWAWelcome v-if="isInstalled" />
    <PWAInstallButton v-else />
  </div>
</template>

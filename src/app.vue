<script setup lang="ts">
import { usePWA } from '@/composables/use-pwa';
import Title from '@/components/title.vue';
import Button from '@/components/button.vue';

const { isInstalled } = usePWA()
</script>

<template>
  <div class="card">
    <Title v-if="isInstalled">
      Добро пожаловать в приложение 🎉
    </Title>
    <Button v-else />
  </div>
</template>

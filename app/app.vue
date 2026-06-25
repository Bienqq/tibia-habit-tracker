<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />

    <main class="mx-auto w-full max-w-5xl px-4 py-6">
      <NuxtPage />
    </main>

    <!-- Onboarding nicka: blokuje aplikację dopóki gracz się nie przedstawi -->
    <UsernameOnboarding v-if="!userStore.isOnboarded" />
  </div>
</template>

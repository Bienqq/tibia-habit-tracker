<script setup lang="ts">
import { useUserStore } from '~/stores/user'

const userStore = useUserStore()
</script>

<template>
  <header class="tibia-panel sticky top-0 z-40 rounded-none border-x-0 border-t-0">
    <div
      class="mx-auto flex w-full max-w-5xl flex-wrap items-center gap-4 px-4 py-3"
    >
      <NuxtLink to="/" class="flex items-center gap-3 no-underline">
        <span class="text-2xl">🗡️</span>
        <span class="pixel tibia-gold-text text-sm leading-tight">
          TIBIA<br >STREAK
        </span>
      </NuxtLink>

      <nav class="flex items-center gap-2">
        <NuxtLink to="/" class="nav-link">
          <i class="pi pi-home" /> <span>Questy</span>
        </NuxtLink>
        <NuxtLink to="/explore" class="nav-link">
          <i class="pi pi-trophy" /> <span>Highscores</span>
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <i class="pi pi-user tibia-gold-text" />
        <span class="pixel text-[0.6rem] text-[color:var(--tibia-text)]">
          {{ userStore.username || 'Gość' }}
        </span>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-link {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.7rem;
  border-radius: 4px;
  font-family: var(--font-pixel);
  font-size: 0.58rem;
  color: var(--tibia-text);
  text-decoration: none;
  border: 2px solid transparent;
  transition: all 0.12s ease;
}
.nav-link:hover {
  color: var(--tibia-gold);
  border-color: var(--tibia-border);
  background: rgba(0, 0, 0, 0.25);
}
.router-link-exact-active.nav-link {
  color: var(--tibia-gold);
  border-color: var(--tibia-border);
  background: rgba(0, 0, 0, 0.35);
  box-shadow: inset 0 0 0 1px rgba(240, 196, 25, 0.3);
}
</style>

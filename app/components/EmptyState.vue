<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  description?: string
}>()
</script>

<template>
  <div
    class="tibia-bevel flex flex-col items-center gap-3 px-6 py-12 text-center"
  >
    <span class="text-5xl opacity-80">{{ icon ?? '🗺️' }}</span>
    <h3 class="pixel text-sm tibia-gold-text">{{ title }}</h3>
    <p
      v-if="description"
      class="max-w-md text-sm text-[color:var(--tibia-text-muted)]"
    >
      {{ description }}
    </p>
    <slot />
  </div>
</template>

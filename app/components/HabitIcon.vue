<script setup lang="ts">
/** Renderuje ikonę nawyku: emoji (zwykły tekst) lub klasę PrimeIcon ("pi pi-..."). */
const props = withDefaults(
  defineProps<{ icon: string; size?: string }>(),
  { size: '1.5rem' },
)

const isPrimeIcon = computed(() => props.icon.startsWith('pi '))
</script>

<template>
  <i
    v-if="isPrimeIcon"
    :class="icon"
    :style="{ fontSize: size }"
    class="tibia-gold-text"
    aria-hidden="true"
  />
  <span
    v-else
    :style="{ fontSize: size, lineHeight: 1 }"
    role="img"
    aria-hidden="true"
  >
    {{ icon }}
  </span>
</template>

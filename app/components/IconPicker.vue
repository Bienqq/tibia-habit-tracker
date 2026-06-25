<script setup lang="ts">
import { HABIT_ICONS } from '~/utils/seed'

const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="grid grid-cols-7 gap-2">
    <button
      v-for="opt in HABIT_ICONS"
      :key="opt.value"
      type="button"
      class="icon-cell"
      :class="{ 'icon-cell--active': model === opt.value }"
      :title="opt.label"
      :aria-label="opt.label"
      :aria-pressed="model === opt.value"
      @click="model = opt.value"
    >
      <HabitIcon :icon="opt.value" size="1.25rem" />
    </button>
  </div>
</template>

<style scoped>
.icon-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  cursor: pointer;
  border: 2px solid #000;
  border-radius: 4px;
  background: linear-gradient(#3a322b, #1f1a16);
  box-shadow: inset 1px 1px 0 rgba(255, 215, 120, 0.12);
  transition: all 0.1s ease;
}
.icon-cell:hover {
  filter: brightness(1.2);
}
.icon-cell--active {
  border-color: var(--tibia-gold);
  box-shadow:
    inset 1px 1px 0 rgba(255, 215, 120, 0.25),
    0 0 0 2px rgba(240, 196, 25, 0.5);
}
</style>

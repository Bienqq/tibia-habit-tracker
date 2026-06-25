<script setup lang="ts">
import { useHabitsStore } from '~/stores/habits'

const habitsStore = useHabitsStore()
</script>

<template>
  <div
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
  >
    <HabitCard
      v-for="habit in habitsStore.items"
      :key="habit.id"
      :habit="habit"
    />
  </div>
</template>

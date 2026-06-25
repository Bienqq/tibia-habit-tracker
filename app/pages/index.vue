<script setup lang="ts">
import { ref } from 'vue'
import { useHabitsStore } from '~/stores/habits'

const habitsStore = useHabitsStore()
const showAdd = ref(false)
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 class="pixel text-lg tibia-gold-text">Twoje questy</h1>
        <p class="mt-1 text-sm text-[color:var(--tibia-text-muted)]">
          Śledź, jak długo nie wykonujesz danej czynności i pobijaj rekordy.
        </p>
      </div>
      <Button label="Nowy quest" icon="pi pi-plus" @click="showAdd = true" />
    </div>

    <StatsOverview />

    <HabitGrid v-if="habitsStore.hasHabits" />
    <EmptyState
      v-else
      icon="🛡️"
      title="Brak aktywnych questów"
      description="Dodaj pierwszy nawyk, którego chcesz unikać — np. „Nie palę papierosów” — i rozpocznij naliczanie serii."
    >
      <Button
        label="Dodaj pierwszy quest"
        icon="pi pi-plus"
        class="mt-2"
        @click="showAdd = true"
      />
    </EmptyState>

    <AddHabitDialog v-model:visible="showAdd" />
  </div>
</template>

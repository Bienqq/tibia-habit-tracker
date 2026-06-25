<script setup lang="ts">
import { computed } from 'vue'
import type { Habit } from '~/types'
import { useStreak } from '~/composables/useStreak'
import { useHabitsStore } from '~/stores/habits'
import { useLeaderboardStore } from '~/stores/leaderboard'
import { useUserStore } from '~/stores/user'
import { formatDuration } from '~/utils/formatDuration'

const props = defineProps<{ habit: Habit }>()

const habitsStore = useHabitsStore()
const leaderboard = useLeaderboardStore()
const userStore = useUserStore()

const { currentMs, breakdown } = useStreak(() => props.habit.startedAt)

// Wyniki rywali (bez mojego wpisu) dla tego nawyku
const otherEntries = computed(() =>
  leaderboard
    .getRankedEntries(props.habit.slug)
    .filter((e) => e.username !== userStore.username),
)

const recordToBeatMs = computed(() => otherEntries.value[0]?.streakMs ?? null)

const isTop1 = computed(
  () =>
    recordToBeatMs.value === null || currentMs.value >= recordToBeatMs.value,
)

const rankPosition = computed(
  () => otherEntries.value.filter((e) => e.streakMs > currentMs.value).length + 1,
)

function relapse() {
  habitsStore.relapse(props.habit.id)
}

function remove() {
  habitsStore.removeHabit(props.habit.id)
}

const pad = (n: number) => String(n).padStart(2, '0')

// Segmenty dużego licznika: DD : HH : MM : SS
const timeUnits = computed(() => [
  { value: breakdown.value.days, label: 'dni' },
  { value: breakdown.value.hours, label: 'godz' },
  { value: breakdown.value.minutes, label: 'min' },
  { value: breakdown.value.seconds, label: 'sek' },
])
</script>

<template>
  <article class="tibia-panel flex flex-col overflow-hidden">
    <!-- Pasek tytułowy questa -->
    <div class="tibia-titlebar">
      <span
        class="flex h-7 w-7 items-center justify-center rounded"
        :style="{ boxShadow: `inset 0 0 0 2px ${habit.color}` }"
      >
        <HabitIcon :icon="habit.icon" size="1.1rem" />
      </span>
      <span class="truncate">{{ habit.name }}</span>

      <span class="ml-auto flex items-center gap-2">
        <span
          v-if="isTop1"
          class="tibia-crown flex items-center gap-1 text-[0.6rem]"
          title="Jesteś TOP 1!"
        >
          <i class="pi pi-crown" /> TOP 1
        </span>
        <span v-else class="text-[0.6rem] text-[color:var(--tibia-text-muted)]">
          #{{ rankPosition }}
        </span>
        <button
          class="cursor-pointer border-0 bg-transparent p-1 text-[color:var(--tibia-text-muted)] hover:text-[color:var(--tibia-hp)]"
          title="Usuń quest"
          @click="remove"
        >
          <i class="pi pi-times" />
        </button>
      </span>
    </div>

    <!-- Treść -->
    <div class="flex flex-1 flex-col gap-4 p-4">
      <!-- Duży licznik DD : HH : MM : SS -->
      <div class="flex items-end justify-center gap-1 py-1">
        <template v-for="(unit, i) in timeUnits" :key="unit.label">
          <span v-if="i > 0" class="pixel pb-3 text-lg tibia-gold-text">:</span>
          <span class="flex flex-col items-center">
            <span class="pixel text-xl text-[color:var(--tibia-text)]">
              {{ pad(unit.value) }}
            </span>
            <span class="text-[0.55rem] text-[color:var(--tibia-text-muted)]">
              {{ unit.label }}
            </span>
          </span>
        </template>
      </div>

      <StreakBar :current-ms="currentMs" :record-ms="recordToBeatMs" />

      <p class="text-center text-[0.7rem] text-[color:var(--tibia-text-muted)]">
        Twój rekord:
        <span class="tibia-gold-text">
          {{ formatDuration(Math.max(habit.longestStreakMs, currentMs)) }}
        </span>
      </p>

      <Button
        label="Złamałem nawyk"
        icon="pi pi-replay"
        severity="danger"
        class="mt-auto w-full justify-center"
        @click="relapse"
      />
    </div>
  </article>
</template>

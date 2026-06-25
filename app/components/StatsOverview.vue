<script setup lang="ts">
import { computed } from 'vue'
import { useTicker } from '~/composables/useTicker'
import { useHabitsStore } from '~/stores/habits'
import { useLeaderboardStore } from '~/stores/leaderboard'
import { useUserStore } from '~/stores/user'
import { formatDuration } from '~/utils/formatDuration'

const habitsStore = useHabitsStore()
const leaderboard = useLeaderboardStore()
const userStore = useUserStore()
const now = useTicker()

/** Najlepszy wynik użytkownika dla nawyku (rekord lub trwająca seria). */
function myBest(startedAt: number, longest: number): number {
  return Math.max(longest, now.value.getTime() - startedAt)
}

const longestStreak = computed(() =>
  habitsStore.items.reduce(
    (max, h) => Math.max(max, myBest(h.startedAt, h.longestStreakMs)),
    0,
  ),
)

const top1Count = computed(
  () =>
    habitsStore.items.filter((h) => {
      const others = leaderboard
        .getRankedEntries(h.slug)
        .filter((e) => e.username !== userStore.username)
      const record = others[0]?.streakMs ?? null
      return record === null || myBest(h.startedAt, h.longestStreakMs) >= record
    }).length,
)

const stats = computed(() => [
  { icon: 'pi pi-flag', label: 'Aktywne questy', value: String(habitsStore.items.length) },
  { icon: 'pi pi-clock', label: 'Najdłuższa seria', value: formatDuration(longestStreak.value) },
  { icon: 'pi pi-crown', label: 'Zdobyte TOP 1', value: String(top1Count.value) },
])
</script>

<template>
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div
      v-for="stat in stats"
      :key="stat.label"
      class="tibia-bevel flex items-center gap-3 px-4 py-3"
      style="background: linear-gradient(var(--tibia-stone-800), var(--tibia-stone-900))"
    >
      <i :class="stat.icon" class="text-2xl tibia-gold-text" />
      <div class="flex flex-col">
        <span class="pixel text-base text-[color:var(--tibia-text)]">
          {{ stat.value }}
        </span>
        <span class="text-[0.65rem] text-[color:var(--tibia-text-muted)]">
          {{ stat.label }}
        </span>
      </div>
    </div>
  </div>
</template>

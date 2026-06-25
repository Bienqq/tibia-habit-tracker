<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHabitsStore } from '~/stores/habits'
import { useLeaderboardStore } from '~/stores/leaderboard'
import { formatDuration } from '~/utils/formatDuration'
import { HABIT_COLORS } from '~/utils/seed'

const leaderboard = useLeaderboardStore()
const habitsStore = useHabitsStore()

const selectedSlug = ref<string | null>(null)

const selected = computed(() =>
  selectedSlug.value ? leaderboard.find(selectedSlug.value) : undefined,
)

const topEntry = computed(() =>
  selectedSlug.value ? leaderboard.getTopEntry(selectedSlug.value) : null,
)

const isTracked = computed(() =>
  selectedSlug.value ? habitsStore.isTracked(selectedSlug.value) : false,
)

function join() {
  if (!selected.value) return
  const color = HABIT_COLORS[Math.floor(Math.random() * HABIT_COLORS.length)]!
  habitsStore.addFromCatalog(selected.value.slug, color)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h1 class="pixel text-lg tibia-gold-text">Highscores</h1>
      <p class="mt-1 text-sm text-[color:var(--tibia-text-muted)]">
        Wyszukaj nawyk, zobacz najlepszy wynik (TOP 1) i dołącz, by go pobić.
      </p>
    </div>

    <div class="tibia-panel p-4">
      <HabitSearch @select="selectedSlug = $event" />
    </div>

    <section v-if="selected" class="tibia-panel overflow-hidden">
      <div class="tibia-titlebar">
        <HabitIcon :icon="selected.icon" size="1.1rem" />
        <span>{{ selected.name }}</span>
        <span
          v-if="topEntry"
          class="ml-auto flex items-center gap-1 text-[0.6rem]"
        >
          <i class="pi pi-crown tibia-crown" />
          {{ topEntry.username }} — {{ formatDuration(topEntry.streakMs) }}
        </span>
      </div>

      <div class="flex flex-col gap-4 p-4">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-[color:var(--tibia-text-muted)]">
            <template v-if="topEntry">
              Rekord do pobicia:
              <span class="tibia-gold-text">
                {{ formatDuration(topEntry.streakMs) }}
              </span>
            </template>
            <template v-else> Brak rekordu — bądź pierwszy! </template>
          </p>

          <Button
            v-if="!isTracked"
            label="Dołącz i pobij rekord"
            icon="pi pi-bolt"
            @click="join"
          />
          <Tag v-else value="Już śledzisz ten quest" severity="warn" />
        </div>

        <LeaderboardTable :slug="selected.slug" />
      </div>
    </section>

    <EmptyState
      v-else
      icon="🏆"
      title="Wyszukaj nawyk"
      description="Wpisz nazwę powyżej, aby zobaczyć tablicę Highscores i rekord TOP 1."
    />
  </div>
</template>

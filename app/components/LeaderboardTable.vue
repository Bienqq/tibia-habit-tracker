<script setup lang="ts">
import { computed } from 'vue'
import type { LeaderboardEntry } from '~/types'
import { useTicker } from '~/composables/useTicker'
import { useHabitsStore } from '~/stores/habits'
import { useLeaderboardStore } from '~/stores/leaderboard'
import { useUserStore } from '~/stores/user'
import { formatDuration } from '~/utils/formatDuration'

const props = defineProps<{ slug: string }>()

const leaderboard = useLeaderboardStore()
const habitsStore = useHabitsStore()
const userStore = useUserStore()
const now = useTicker()

/**
 * Wiersze rankingu z UWZGLĘDNIENIEM trwającej serii użytkownika (na żywo),
 * dzięki czemu awans na TOP 1 widać natychmiast.
 */
const rows = computed<LeaderboardEntry[]>(() => {
  const list: LeaderboardEntry[] = leaderboard
    .getRankedEntries(props.slug)
    .map((e) => ({ ...e, isMe: e.username === userStore.username }))

  const mine = habitsStore.getBySlug(props.slug)
  if (mine && userStore.username) {
    const liveMs = Math.max(
      mine.longestStreakMs,
      now.value.getTime() - mine.startedAt,
    )
    const existing = list.find((e) => e.username === userStore.username)
    if (existing) {
      existing.streakMs = Math.max(existing.streakMs, liveMs)
      existing.isMe = true
    } else {
      list.push({
        username: userStore.username,
        streakMs: liveMs,
        achievedAt: now.value.getTime(),
        isMe: true,
      })
    }
  }

  return list.sort((a, b) => b.streakMs - a.streakMs)
})

const topStreak = computed(() => rows.value[0]?.streakMs ?? 0)

function rowClass(data: LeaderboardEntry) {
  return data.streakMs === topStreak.value && topStreak.value > 0
    ? 'highscore-top1'
    : ''
}

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString('pl-PL')
}
</script>

<template>
  <DataTable :value="rows" :row-class="rowClass" data-key="username" class="text-sm">
    <Column header="#" class="w-12">
      <template #body="{ index }">
        <span class="pixel text-[0.65rem]">{{ index + 1 }}</span>
      </template>
    </Column>

    <Column header="Gracz">
      <template #body="{ data, index }">
        <span class="flex items-center gap-2">
          <i v-if="index === 0" class="pi pi-crown tibia-crown" />
          <span :class="{ 'tibia-gold-text': data.isMe }">{{ data.username }}</span>
          <span
            v-if="data.isMe"
            class="text-[0.6rem] text-[color:var(--tibia-text-muted)]"
          >
            (Ty)
          </span>
        </span>
      </template>
    </Column>

    <Column header="Rekord">
      <template #body="{ data }">
        {{ formatDuration(data.streakMs) }}
      </template>
    </Column>

    <Column header="Data" class="hidden sm:table-cell">
      <template #body="{ data }">
        <span class="text-[color:var(--tibia-text-muted)]">
          {{ formatDate(data.achievedAt) }}
        </span>
      </template>
    </Column>
  </DataTable>
</template>

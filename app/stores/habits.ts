import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Habit } from '~/types'
import { slugify } from '~/utils/slugify'
import { useLeaderboardStore } from './leaderboard'
import { useUserStore } from './user'

/** Moje liczniki nawyków ("questy"). */
export const useHabitsStore = defineStore(
  'habits',
  () => {
    const items = ref<Habit[]>([])

    const hasHabits = computed(() => items.value.length > 0)
    const longestEver = computed(() =>
      items.value.reduce((max, h) => Math.max(max, h.longestStreakMs), 0),
    )

    function getById(id: string): Habit | undefined {
      return items.value.find((h) => h.id === id)
    }

    function isTracked(slug: string): boolean {
      return items.value.some((h) => h.slug === slug)
    }

    /** Dodaje nowy nawyk i rejestruje go w katalogu rankingu. */
    function addHabit(input: { name: string; icon: string; color: string }): Habit {
      const leaderboard = useLeaderboardStore()
      const slug = slugify(input.name)
      const habit: Habit = {
        id: crypto.randomUUID(),
        slug,
        name: input.name.trim(),
        icon: input.icon,
        color: input.color,
        startedAt: Date.now(),
        longestStreakMs: 0,
      }
      items.value.push(habit)
      leaderboard.ensureHabit(slug, habit.name, habit.icon)
      return habit
    }

    /** Dołącza do istniejącego nawyku z katalogu (aby pobić rekord). */
    function addFromCatalog(slug: string, color: string): Habit | null {
      const leaderboard = useLeaderboardStore()
      const catalogHabit = leaderboard.find(slug)
      if (!catalogHabit || isTracked(slug)) return getBySlug(slug) ?? null

      const habit: Habit = {
        id: crypto.randomUUID(),
        slug,
        name: catalogHabit.name,
        icon: catalogHabit.icon,
        color,
        startedAt: Date.now(),
        longestStreakMs: 0,
      }
      items.value.push(habit)
      return habit
    }

    function getBySlug(slug: string): Habit | undefined {
      return items.value.find((h) => h.slug === slug)
    }

    /**
     * "Złamałem nawyk" — kończy bieżącą serię, zapisuje rekord do rankingu
     * i restartuje licznik.
     */
    function relapse(id: string) {
      const habit = getById(id)
      if (!habit) return

      const user = useUserStore()
      const leaderboard = useLeaderboardStore()
      const endedStreak = Date.now() - habit.startedAt

      if (endedStreak > habit.longestStreakMs) {
        habit.longestStreakMs = endedStreak
      }
      if (user.username) {
        leaderboard.submitScore(
          habit.slug,
          habit.name,
          habit.icon,
          user.username,
          habit.longestStreakMs,
        )
      }
      habit.startedAt = Date.now()
    }

    function removeHabit(id: string) {
      items.value = items.value.filter((h) => h.id !== id)
    }

    return {
      items,
      hasHabits,
      longestEver,
      getById,
      getBySlug,
      isTracked,
      addHabit,
      addFromCatalog,
      relapse,
      removeHabit,
    }
  },
  { persist: true },
)

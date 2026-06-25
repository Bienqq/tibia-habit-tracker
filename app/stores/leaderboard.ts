import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { CatalogHabit, LeaderboardEntry } from '~/types'
import { buildSeedCatalog } from '~/utils/seed'

/**
 * Katalog nawyków + tablice Highscores.
 *
 * W PoC nie ma backendu, więc katalog jest zasilony danymi przykładowymi
 * (rekordy "innych osób"). Tu żyje cała logika rankingu: wyszukiwanie,
 * pobieranie TOP 1 i zgłaszanie wyników.
 */
export const useLeaderboardStore = defineStore(
  'leaderboard',
  () => {
    // Stan domyślny = seed; przy kolejnych wizytach nadpisany przez localStorage.
    const catalog = ref<CatalogHabit[]>(buildSeedCatalog())

    function find(slug: string): CatalogHabit | undefined {
      return catalog.value.find((h) => h.slug === slug)
    }

    /** Tworzy wpis katalogu, jeśli jeszcze nie istnieje. */
    function ensureHabit(slug: string, name: string, icon: string): CatalogHabit {
      let habit = find(slug)
      if (!habit) {
        habit = { slug, name, icon, entries: [] }
        catalog.value.push(habit)
      }
      return habit
    }

    /** Najlepszy wynik (TOP 1) dla nawyku lub null. */
    function getTopEntry(slug: string): LeaderboardEntry | null {
      const habit = find(slug)
      if (!habit || habit.entries.length === 0) return null
      return [...habit.entries].sort((a, b) => b.streakMs - a.streakMs)[0] ?? null
    }

    /** Wszystkie wyniki nawyku posortowane malejąco. */
    function getRankedEntries(slug: string): LeaderboardEntry[] {
      const habit = find(slug)
      if (!habit) return []
      return [...habit.entries].sort((a, b) => b.streakMs - a.streakMs)
    }

    /**
     * Zgłasza wynik użytkownika. Zachowujemy najlepszy (najdłuższy) rezultat
     * dla danego nicka w danym nawyku.
     */
    function submitScore(
      slug: string,
      name: string,
      icon: string,
      username: string,
      streakMs: number,
    ) {
      const habit = ensureHabit(slug, name, icon)
      const existing = habit.entries.find((e) => e.username === username)
      if (existing) {
        if (streakMs > existing.streakMs) {
          existing.streakMs = streakMs
          existing.achievedAt = Date.now()
        }
        existing.isMe = true
      } else {
        habit.entries.push({
          username,
          streakMs,
          achievedAt: Date.now(),
          isMe: true,
        })
      }
    }

    return {
      catalog,
      find,
      ensureHabit,
      getTopEntry,
      getRankedEntries,
      submitScore,
    }
  },
  { persist: true },
)

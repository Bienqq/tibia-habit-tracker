/** Mój licznik nawyku ("quest"). */
export interface Habit {
  id: string
  /** Znormalizowana nazwa — łączy nawyk z katalogiem rankingu. */
  slug: string
  /** Czytelna nazwa, np. "Nie palę papierosów". */
  name: string
  /** Klasa PrimeIcon ("pi pi-ban") lub emoji ("🚬"). */
  icon: string
  /** Akcent karty (hex). */
  color: string
  /** Początek bieżącej serii (epoch ms). */
  startedAt: number
  /** Najdłuższa zakończona seria użytkownika dla tego nawyku (ms). */
  longestStreakMs: number
}

/** Pojedynczy wynik w tablicy Highscores danego nawyku. */
export interface LeaderboardEntry {
  username: string
  /** Najdłuższy osiągnięty streak (ms). */
  streakMs: number
  /** Kiedy rekord ustanowiono (epoch ms). */
  achievedAt: number
  /** Czy to wpis bieżącego użytkownika. */
  isMe?: boolean
}

/** Nawyk w katalogu współdzielonym (seed + dodane przez użytkownika). */
export interface CatalogHabit {
  slug: string
  name: string
  icon: string
  entries: LeaderboardEntry[]
}

/** Wynik wyszukiwania nawyku w katalogu. */
export interface HabitSearchResult {
  slug: string
  name: string
  icon: string
  topEntry: LeaderboardEntry | null
  /** Czy użytkownik już śledzi ten nawyk. */
  alreadyTracked: boolean
}

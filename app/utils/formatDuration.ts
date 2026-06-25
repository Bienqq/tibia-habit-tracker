/**
 * Formatuje czas trwania (ms) na czytelny polski opis serii.
 * @example formatDuration(183_000) => "3 min 3 s"
 * @example formatDuration(176_400_000) => "2 dni 1 godz"
 */
export function formatDuration(ms: number): string {
  if (ms <= 0) return '0 s'

  const totalSeconds = Math.floor(ms / 1000)
  const days = Math.floor(totalSeconds / 86_400)
  const hours = Math.floor((totalSeconds % 86_400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const parts: string[] = []
  if (days > 0) parts.push(`${days} ${pluralDay(days)}`)
  if (hours > 0) parts.push(`${hours} godz`)
  if (minutes > 0 && days === 0) parts.push(`${minutes} min`)
  if (seconds >= 0 && days === 0 && hours === 0) parts.push(`${seconds} s`)

  // Pokazujemy maksymalnie dwie najbardziej znaczące jednostki.
  return parts.slice(0, 2).join(' ')
}

/** Pełny rozkład serii do dużego wyświetlacza (DD : HH : MM : SS). */
export function breakdownDuration(ms: number): {
  days: number
  hours: number
  minutes: number
  seconds: number
} {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000))
  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

function pluralDay(n: number): string {
  if (n === 1) return 'dzień'
  return 'dni'
}

/** Stała pomocnicza: liczba ms w dobie. */
export const MS_PER_DAY = 86_400_000

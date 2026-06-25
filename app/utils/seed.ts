import type { CatalogHabit } from '~/types'
import { MS_PER_DAY } from './formatDuration'

/**
 * Dane przykładowe katalogu nawyków — reprezentują rekordy "innych osób".
 * Dzięki nim mechanika "pobij rekord / zostań TOP 1" działa od razu w PoC,
 * mimo braku prawdziwego backendu.
 */
export function buildSeedCatalog(): CatalogHabit[] {
  const now = Date.now()
  const daysAgo = (d: number) => now - d * MS_PER_DAY

  return [
    {
      slug: 'nie-pale-papierosow',
      name: 'Nie palę papierosów',
      icon: '🚬',
      entries: [
        { username: 'Anna', streakMs: 3 * MS_PER_DAY, achievedAt: daysAgo(12) },
        { username: 'Kamil', streakMs: 2.2 * MS_PER_DAY, achievedAt: daysAgo(30) },
        { username: 'Bartek', streakMs: 1 * MS_PER_DAY, achievedAt: daysAgo(5) },
      ],
    },
    {
      slug: 'bez-cukru',
      name: 'Bez cukru',
      icon: '🍰',
      entries: [
        { username: 'Ewa', streakMs: 9 * MS_PER_DAY, achievedAt: daysAgo(20) },
        { username: 'Marek', streakMs: 4 * MS_PER_DAY, achievedAt: daysAgo(8) },
      ],
    },
    {
      slug: 'bez-social-mediow',
      name: 'Bez social mediów',
      icon: '📱',
      entries: [
        { username: 'Zofia', streakMs: 5 * MS_PER_DAY, achievedAt: daysAgo(14) },
        { username: 'Piotr', streakMs: 1.5 * MS_PER_DAY, achievedAt: daysAgo(3) },
      ],
    },
    {
      slug: 'bez-alkoholu',
      name: 'Bez alkoholu',
      icon: '🍺',
      entries: [
        { username: 'Tomek', streakMs: 21 * MS_PER_DAY, achievedAt: daysAgo(40) },
        { username: 'Ola', streakMs: 14 * MS_PER_DAY, achievedAt: daysAgo(18) },
        { username: 'Jan', streakMs: 7 * MS_PER_DAY, achievedAt: daysAgo(6) },
      ],
    },
    {
      slug: 'bez-fast-foodow',
      name: 'Bez fast foodów',
      icon: '🍔',
      entries: [
        { username: 'Natalia', streakMs: 6 * MS_PER_DAY, achievedAt: daysAgo(10) },
      ],
    },
  ]
}

/** Kuratorowana lista ikon do wyboru (PrimeIcons + emoji) dla nowych nawyków. */
export const HABIT_ICONS: { value: string; label: string }[] = [
  { value: '🚬', label: 'Papieros' },
  { value: '🍺', label: 'Alkohol' },
  { value: '🍰', label: 'Słodycze' },
  { value: '🍔', label: 'Fast food' },
  { value: '📱', label: 'Telefon' },
  { value: '🎮', label: 'Gry' },
  { value: '☕', label: 'Kawa' },
  { value: '🛒', label: 'Zakupy' },
  { value: '😡', label: 'Złość' },
  { value: 'pi pi-ban', label: 'Zakaz' },
  { value: 'pi pi-heart', label: 'Serce' },
  { value: 'pi pi-star', label: 'Gwiazda' },
  { value: 'pi pi-bolt', label: 'Energia' },
  { value: 'pi pi-shield', label: 'Tarcza' },
]

/** Kolory akcentu kart (klejnoty). */
export const HABIT_COLORS: string[] = [
  '#d4a017',
  '#c0392b',
  '#2980b9',
  '#27ae60',
  '#8e44ad',
  '#e67e22',
]

# Tibia Streak — liczniki nawyków

Aplikacja (PoC) do śledzenia, **jak długo NIE wykonujesz danej czynności**
(np. „od 2 dni nie palę papierosów”). Dodajesz „quest”, naliczasz serię na
żywo, a przyciskiem **„Złamałem nawyk”** restartujesz licznik. Możesz też
wyszukać istniejący nawyk, zobaczyć **rekord TOP 1** innych graczy i go pobić.

UI w mocnym klimacie klienta gry **Tibia (CipSoft)**.

## Stack

- **Nuxt 4** + **Vue 3** + TypeScript (SPA, `ssr: false`)
- **PrimeVue 4** (styled mode, własny preset „Tibia” na bazie Aura) + PrimeIcons
- **Tailwind CSS v4** (układ + bloki)
- **Pinia** + `pinia-plugin-persistedstate` (trwałość w `localStorage`)
- **VueUse** (`useNow` — jedno źródło tykania) + **Zod** (walidacja)

> PoC bez backendu: ranking jest zasilony danymi przykładowymi (rekordy
> „innych osób”) w `app/utils/seed.ts`, więc mechanika „pobij TOP 1” działa od
> razu lokalnie.

## Uruchomienie

```bash
npm install
npm run dev      # http://localhost:3000
```

Inne skrypty: `npm run build`, `npm run preview`, `npm run lint`.

## Struktura

- `theme/tibia-preset.ts` — paleta PrimeVue (złoto/kamień)
- `app/assets/css/tibia.css` — fazowane ramki, paski HP/EXP, pikselowy font
- `app/stores/` — `user`, `habits`, `leaderboard` (logika serii i rankingu)
- `app/composables/` — `useTicker` (wspólny zegar), `useStreak`
- `app/components/` — karty questów, Highscores, wyszukiwarka, dialogi
- `app/pages/` — `index` (Questy), `explore` (Highscores)

import { createSharedComposable, useNow } from '@vueuse/core'

/**
 * Jedno współdzielone źródło czasu dla CAŁEJ aplikacji.
 *
 * Wszystkie liczniki czytają ten sam tykający `Date`, więc mamy jeden
 * interwał (wydajność) i pełną synchronizację między kartami nawyków.
 */
export const useTicker = createSharedComposable(() =>
  useNow({ interval: 1000 }),
)

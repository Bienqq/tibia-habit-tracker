import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import { useTicker } from './useTicker'
import { breakdownDuration, formatDuration } from '~/utils/formatDuration'

/**
 * Reaktywnie liczy bieżącą serię nawyku względem wspólnego zegara.
 *
 * @param startedAt epoch ms — początek bieżącej serii (ref/getter/wartość)
 */
export function useStreak(startedAt: MaybeRefOrGetter<number>) {
  const now = useTicker()

  const currentMs = computed(() =>
    Math.max(0, now.value.getTime() - toValue(startedAt)),
  )

  const breakdown = computed(() => breakdownDuration(currentMs.value))
  const formatted = computed(() => formatDuration(currentMs.value))

  return { currentMs, breakdown, formatted }
}

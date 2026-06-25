<script setup lang="ts">
import { computed } from 'vue'
import { formatDuration } from '~/utils/formatDuration'

/**
 * Pasek serii w stylu EXP/HP z Tibii — pokazuje postęp w pobijaniu rekordu.
 */
const props = defineProps<{
  currentMs: number
  recordMs: number | null
}>()

const hasRecord = computed(() => props.recordMs !== null && props.recordMs > 0)

const percent = computed(() => {
  if (!hasRecord.value) return 100
  return Math.min(100, (props.currentMs / (props.recordMs as number)) * 100)
})

const beaten = computed(
  () => hasRecord.value && props.currentMs >= (props.recordMs as number),
)

const label = computed(() => {
  if (!hasRecord.value) return 'Ustanawiasz pierwszy rekord!'
  if (beaten.value) return 'REKORD POBITY!'
  return `${Math.floor(percent.value)}% do rekordu (${formatDuration(props.recordMs as number)})`
})
</script>

<template>
  <div class="tibia-bar" role="progressbar" :aria-valuenow="Math.floor(percent)">
    <div
      class="tibia-bar__fill"
      :class="beaten || !hasRecord ? 'tibia-bar__fill--exp' : 'tibia-bar__fill--hp'"
      :style="{ width: percent + '%' }"
    />
    <span class="tibia-bar__label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useHabitsStore } from '~/stores/habits'
import { useLeaderboardStore } from '~/stores/leaderboard'
import { formatDuration } from '~/utils/formatDuration'
import { slugify } from '~/utils/slugify'

const emit = defineEmits<{ select: [slug: string] }>()

const leaderboard = useLeaderboardStore()
const habitsStore = useHabitsStore()

const query = ref('')

const results = computed(() => {
  const q = slugify(query.value)
  return leaderboard.catalog
    .filter((h) => q.length === 0 || h.slug.includes(q))
    .map((h) => {
      const top = leaderboard.getTopEntry(h.slug)
      return {
        slug: h.slug,
        name: h.name,
        icon: h.icon,
        topLabel: top
          ? `${top.username} — ${formatDuration(top.streakMs)}`
          : 'brak rekordu',
        tracked: habitsStore.isTracked(h.slug),
      }
    })
})
</script>

<template>
  <div class="flex flex-col gap-3">
    <span class="p-input-icon-left w-full">
      <InputText
        v-model="query"
        placeholder="Szukaj nawyku, np. papierosy, cukier, alkohol…"
        class="w-full"
      />
    </span>

    <ul class="flex flex-col gap-2">
      <li v-if="results.length === 0" class="text-sm text-[color:var(--tibia-text-muted)]">
        Brak wyników. Dodaj własny quest na stronie „Questy".
      </li>

      <li v-for="r in results" :key="r.slug">
        <button
          type="button"
          class="result-row tibia-bevel"
          @click="emit('select', r.slug)"
        >
          <HabitIcon :icon="r.icon" size="1.4rem" />
          <span class="flex flex-1 flex-col text-left">
            <span class="text-[color:var(--tibia-text)]">{{ r.name }}</span>
            <span class="text-[0.7rem] text-[color:var(--tibia-text-muted)]">
              <i class="pi pi-crown tibia-crown" /> TOP 1: {{ r.topLabel }}
            </span>
          </span>
          <Tag v-if="r.tracked" value="Śledzisz" severity="warn" />
          <i class="pi pi-angle-right tibia-gold-text" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.result-row {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.85rem;
  padding: 0.7rem 0.9rem;
  cursor: pointer;
  background: linear-gradient(var(--tibia-stone-800), var(--tibia-stone-900));
  transition: filter 0.1s ease;
}
.result-row:hover {
  filter: brightness(1.15);
}
</style>

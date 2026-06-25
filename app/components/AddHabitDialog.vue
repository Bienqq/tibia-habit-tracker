<script setup lang="ts">
import { ref } from 'vue'
import { useHabitsStore } from '~/stores/habits'
import { firstError, habitNameSchema } from '~/utils/schemas'
import { HABIT_COLORS, HABIT_ICONS } from '~/utils/seed'

const visible = defineModel<boolean>('visible', { required: true })

const habitsStore = useHabitsStore()

const name = ref('')
const icon = ref(HABIT_ICONS[0]!.value)
const color = ref(HABIT_COLORS[0]!)
const error = ref<string | null>(null)

function reset() {
  name.value = ''
  icon.value = HABIT_ICONS[0]!.value
  color.value = HABIT_COLORS[0]!
  error.value = null
}

function submit() {
  error.value = firstError(habitNameSchema, name.value)
  if (error.value) return
  habitsStore.addHabit({ name: name.value, icon: icon.value, color: color.value })
  reset()
  visible.value = false
}
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    :draggable="false"
    header="Nowy quest — czego unikasz?"
    class="w-[92vw] max-w-lg"
    @hide="reset"
  >
    <div class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <label class="pixel text-[0.6rem] tibia-gold-text" for="habit-name">
          Nazwa nawyku
        </label>
        <InputText
          id="habit-name"
          v-model="name"
          placeholder="np. Nie palę papierosów"
          autofocus
          @keyup.enter="submit"
        />
        <small v-if="error" class="text-[color:var(--tibia-hp)]">{{ error }}</small>
      </div>

      <div class="flex flex-col gap-2">
        <span class="pixel text-[0.6rem] tibia-gold-text">Ikona</span>
        <IconPicker v-model="icon" />
      </div>

      <div class="flex flex-col gap-2">
        <span class="pixel text-[0.6rem] tibia-gold-text">Kolor klejnotu</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="c in HABIT_COLORS"
            :key="c"
            type="button"
            class="color-swatch"
            :class="{ 'color-swatch--active': color === c }"
            :style="{ backgroundColor: c }"
            :aria-label="`Kolor ${c}`"
            :aria-pressed="color === c"
            @click="color = c"
          />
        </div>
      </div>
    </div>

    <template #footer>
      <Button
        label="Anuluj"
        icon="pi pi-times"
        severity="secondary"
        @click="visible = false"
      />
      <Button label="Rozpocznij quest" icon="pi pi-check" @click="submit" />
    </template>
  </Dialog>
</template>

<style scoped>
.color-swatch {
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  border: 2px solid #000;
  border-radius: 4px;
  box-shadow: inset 1px 1px 0 rgba(255, 255, 255, 0.4);
  transition: transform 0.1s ease;
}
.color-swatch:hover {
  transform: scale(1.1);
}
.color-swatch--active {
  outline: 2px solid var(--tibia-gold);
  outline-offset: 2px;
}
</style>

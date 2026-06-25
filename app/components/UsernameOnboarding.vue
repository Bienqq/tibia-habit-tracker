<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { firstError, usernameSchema } from '~/utils/schemas'

const userStore = useUserStore()

const name = ref('')
const error = ref<string | null>(null)

function submit() {
  error.value = firstError(usernameSchema, name.value)
  if (error.value) return
  userStore.setUsername(name.value)
}
</script>

<template>
  <Dialog
    :visible="true"
    modal
    :closable="false"
    :draggable="false"
    header="Przedstaw się, bohaterze"
    class="w-[90vw] max-w-md"
  >
    <div class="flex flex-col gap-4">
      <p class="text-sm text-[color:var(--tibia-text-muted)]">
        Wpisz swój nick — pod nim trafisz do tablicy Highscores i będziesz
        pobijać rekordy innych graczy.
      </p>

      <div class="flex flex-col gap-2">
        <label class="pixel text-[0.6rem] tibia-gold-text" for="nick">
          Nick gracza
        </label>
        <InputText
          id="nick"
          v-model="name"
          placeholder="np. Knight_Slayer"
          autofocus
          @keyup.enter="submit"
        />
        <small v-if="error" class="text-[color:var(--tibia-hp)]">
          {{ error }}
        </small>
      </div>

      <Button label="Rozpocznij przygodę" icon="pi pi-flag" @click="submit" />
    </div>
  </Dialog>
</template>

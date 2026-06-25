import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/** Lekka tożsamość gracza — tylko nick (bez hasła), zapis lokalny. */
export const useUserStore = defineStore(
  'user',
  () => {
    const username = ref('')

    const isOnboarded = computed(() => username.value.trim().length >= 2)

    function setUsername(name: string) {
      username.value = name.trim()
    }

    return { username, isOnboarded, setUsername }
  },
  { persist: true },
)

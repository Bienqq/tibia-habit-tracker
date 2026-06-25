import tailwindcss from '@tailwindcss/vite'
import { TibiaPreset } from './theme/tibia-preset'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-06-01',
  devtools: { enabled: true },

  // PoC w pełni po stronie klienta: żywy timer + localStorage => SPA bez hydracji.
  ssr: false,

  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
  ],

  css: ['~/assets/css/main.css', '~/assets/css/tibia.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      title: 'Tibia Streak — liczniki nawyków',
      htmlAttrs: { lang: 'pl', class: 'p-dark' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Śledź, jak długo nie wykonujesz danej czynności i pobijaj rekordy innych w stylu Tibii.',
        },
      ],
    },
  },

  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: TibiaPreset,
        options: {
          darkModeSelector: '.p-dark',
          cssLayer: {
            name: 'primevue',
            order: 'theme, base, primevue, utilities',
          },
        },
      },
    },
  },

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  // Trwałość stanu w localStorage (PoC = SPA, brak limitu ~4KB jak w cookies).
  piniaPluginPersistedstate: {
    storage: 'localStorage',
  },

  typescript: {
    strict: true,
  },
})

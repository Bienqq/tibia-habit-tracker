import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

/**
 * Motyw "Tibia" — preset PrimeVue zbudowany na bazie Aura.
 *
 * Paleta odwzorowuje klimat klienta gry Tibia (CipSoft):
 *  - primary: złoto / bursztyn (akcenty, przyciski-klejnoty)
 *  - surface: głębokie brązy i kamień (panele, tła okien)
 *
 * Drobniejsze efekty (fazowane ramki, paski HP/EXP, pikselowy font)
 * realizuje warstwa CSS w `app/assets/css/tibia.css`.
 */
export const TibiaPreset = definePreset(Aura, {
  semantic: {
    // Złota/bursztynowa paleta akcentów
    primary: {
      50: '#fdf6e3',
      100: '#f9e8b8',
      200: '#f4d98c',
      300: '#efc95f',
      400: '#ebbd3d',
      500: '#d4a017',
      600: '#b8860b',
      700: '#8f6708',
      800: '#6b4d06',
      900: '#4a3404',
      950: '#2b1e02',
    },
    colorScheme: {
      dark: {
        // Neutralny kamień / brąz — powierzchnie okien klienta Tibii
        surface: {
          0: '#ffffff',
          50: '#f3efe6',
          100: '#e8dcc0',
          200: '#cabd99',
          300: '#a89876',
          400: '#7c6e52',
          500: '#564b38',
          600: '#403829',
          700: '#3b352c',
          800: '#2a251e',
          900: '#1f1b15',
          950: '#14110c',
        },
        primary: {
          color: '#f0c419',
          contrastColor: '#1a1612',
          hoverColor: '#ffd84d',
          activeColor: '#d4a017',
        },
        content: {
          background: '{surface.800}',
          hoverBackground: '{surface.700}',
          borderColor: '{primary.700}',
          color: '{surface.100}',
          hoverColor: '{surface.0}',
        },
        text: {
          color: '{surface.100}',
          hoverColor: '#ffffff',
          mutedColor: '{surface.300}',
        },
      },
    },
  },
})

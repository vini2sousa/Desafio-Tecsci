import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    darkMode: false,
  }),
  actions: {
    toggleTheme() {
      this.darkMode = !this.darkMode;
      // Aplicar a classe ao body ou a um container global
      document.body.classList.toggle('dark-mode', this.darkMode);
    },
  },
});

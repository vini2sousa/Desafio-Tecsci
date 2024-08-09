<template>
  <div :class="{ 'dark-mode': themeStore.darkMode }">
    <router-view />
  </div>
</template>

<script setup>
import { useThemeStore } from '@/stores/themeStore';

// Obtenha o store do Pinia
const themeStore = useThemeStore();
</script>

<style>
.dark-mode {
  background-color: #2c2c2c;
  color: #ffffff;
}

/* Outros estilos para o modo escuro */
</style>

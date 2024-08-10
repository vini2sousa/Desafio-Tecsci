<template>
    <v-btn @click="toggleTheme">
      Mudar O tema
    </v-btn>
  </template>
  
  <script setup>
  import { useThemeStore } from '@/stores/themeStore';
  
  const themeStore = useThemeStore();
  
  const toggleTheme = () => {
    themeStore.toggleTheme();
  };
  </script>
  
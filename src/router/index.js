import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import GraficoInterativo from '@/components/GraficoInterativo.vue';
import NomesDoBrasil from '@/components/NomesDoBrasi.vue';
import TerceiraRota from '@/components/TerceiraRota.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/grafico-interativo',
    name: 'GraficoInterativo',
    component: GraficoInterativo,
  },
  {
    path: '/nomes-do-brasil',
    name: 'NomesDoBrasil',
    component: NomesDoBrasil,
  },
  {
    path: '/terceira-rota',
    name: 'TerceiraRota',
    component: TerceiraRota, 
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/Home.vue';
import GraficoInterativo from '@/components/GraficoInterativo.vue';
import NomesDoBrasil from '@/components/NomesDoBrasi.vue';
import NoticiasIBGE from '@/components/NoticiasIBGE.vue';

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
    path: '/noticias-ibge',
    name: 'NoticiasIBGE',
    component: NoticiasIBGE, 
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;

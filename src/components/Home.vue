<template>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
      
      slider-color="transparent"
    >
      <router-link :to="{ path: '/grafico-interativo' }">
        <v-tab :value="1">Gráfico Interativo</v-tab>
      </router-link>
      <router-link :to="{ path: '/nomes-do-brasil' }">
        <v-tab :value="2">Nomes do Brasil</v-tab>
      </router-link>
      <router-link :to="{ path: '/terceira-rota' }">
        <v-tab :value="3">Terceira Rota</v-tab>
      </router-link>
    </v-tabs>
    <v-container fluid>
      <v-row>
        <v-col
          v-for="i in 6"
          :key="i"
          cols="12"
          md="4"
        >
       
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    tab: null,
  }),
}
</script>

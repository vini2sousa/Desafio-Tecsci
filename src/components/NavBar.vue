<template>
  <v-sheet color="#0d1117" elevation="3" rounded="lg">
    <v-tabs
      v-model="tab"
      :items="tabs"
      align-tabs="center"
      color="white"
      height="60"
      slider-color="#f78166"
    >
      <template v-slot:tab="{ item }">
        <v-tab
          :prepend-icon="item.icon"
          :text="item.text"
          :value="item.value"
          class="text-none"
        ></v-tab>
      </template>

      <template v-slot:item="{ item }">
        <v-tabs-window-item :value="item.value" class="pa-4">
        </v-tabs-window-item>
      </template>
    </v-tabs>
  </v-sheet>
</template>
<script>
  export default {
    data: () => ({
      tab: 'tab-1',
      tabs: [
        {
          icon: 'mdi-align-vertical-bottom',
          text: 'Gráfico interativo',
          value: 'tab-1',
        },
        {
          icon: 'mdi-human-capacity-increase',
          text: 'Nomes do Brasil',
          value: 'tab-2',
        },
      
      ],
    }),
  }
</script>
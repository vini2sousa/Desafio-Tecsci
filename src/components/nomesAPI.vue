<template>
    <v-container>
      <!-- Texto informativo -->
      <v-row>
        <v-col>
          <h2>Ranking dos Nomes Mais Frequentes do Brasil</h2>
        </v-col>
      </v-row>
  
      <!-- Botão para gerar a lista -->
      <v-row>
        <v-col>
          <v-btn color="primary" @click="toggleTable">{{ showTable ? 'Recolher Lista' : 'Gerar Lista' }}</v-btn>
        </v-col>
      </v-row>
  
      <!-- Transição para a tabela -->
      <transition name="fade" mode="out-in">
        <!-- Tabela para exibir os dados da API -->
        <v-row v-if="showTable">
          <v-col>
            <v-table :items="rankedNames" :headers="headers" theme="dark">
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Frequência</th>
                  <th class="text-left">Ranking</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in rankedNames" :key="index">
                  <td>{{ item.nome }}</td>
                  <td>{{ item.frequencia }}</td>
                  <td>{{ item.rank }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
      </transition>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'nomesAPI',
    data() {
      return {
        rankedNames: [], // Dados da API
        headers: [
          { text: 'Nome', value: 'nome' },
          { text: 'Frequência', value: 'frequencia' },
          { text: 'Ranking', value: 'rank' },
        ],
        showTable: false, // Controla a visibilidade da tabela
      };
    },
    methods: {
      // Função para alternar a visibilidade da tabela
      toggleTable() {
        if (!this.showTable) {
          // Se a tabela não estiver visível, busca os dados
          this.fetchData();
        }
        // Alterna a visibilidade da tabela
        this.showTable = !this.showTable;
      },
      // Função para buscar dados da API do IBGE
      async fetchData() {
        try {
          const response = await axios.get(
            'https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking'
          );
  
          // Formata os dados recebidos para a tabela
          this.rankedNames = response.data[0].res.map((item, index) => ({
            nome: item.nome,
            frequencia: item.frequencia,
            rank: index + 1,
          }));
  
          if (this.rankedNames.length === 0) {
            alert('Nenhum resultado encontrado.');
          }
        } catch (error) {
          console.error('Erro ao buscar dados:', error);
          alert('Erro ao buscar dados. Por favor, tente novamente.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .v-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .v-row {
    margin-bottom: 20px;
  }
  
  .v-btn {
    margin-bottom: 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #555; /* Cor do texto para o título */
  }
  
  /* Estilo para a transição da tabela */
  .fade-enter-active,
  .fade-leave-active {
    transition: max-height 0.5s ease, opacity 0.5s ease;
    overflow: hidden;
  }
  
  .fade-enter, .fade-leave-to /* .fade-leave-active no final da transição */ {
    max-height: 0;
    opacity: 0;
  }
  
  .fade-enter-to, .fade-leave /* .fade-leave no início da transição */ {
    max-height: 1000px; /* Altura máxima da tabela */
    opacity: 1;
  }
  </style>
  
<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>Filtrar Notícias do IBGE por Data</h2>
        <p>Selecione o intervalo de datas para filtrar as notícias publicadas pelo IBGE.</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="6">
        <div class="date-picker-container">
          <vue-date-picker
            v-model="startDate"
            format="yyyy-MM-dd"
            placeholder="Início"
            class="date-picker-input"
            :popper-options="{ placement: 'bottom-start' }"
          />
          <vue-date-picker
            v-model="endDate"
            format="yyyy-MM-dd"
            placeholder="Fim"
            class="date-picker-input"
            :popper-options="{ placement: 'bottom-start' }"
          />
          <button class="date-picker-button" @click="fetchNoticias">Aplicar Filtro</button>
        </div>
      </v-col>
    </v-row>
    <transition name="fade" mode="out-in">
      <v-row v-if="showTable" key="table">
        <v-col>
          <v-data-table
            :headers="headers"
            :items="noticias"
            :items-per-page="itemsPerPage"
            :page.sync="currentPage"
            class="elevation-1"
            item-key="id"
          >
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.titulo }}</td>
                <td>{{ dataFormatada(item.data_publicacao) }}</td>
                <td>
                  <a :href="item.link" target="_blank" class="news-link" rel="noopener noreferrer">Leia mais</a>
                </td>
              </tr>
            </template>
            <template v-slot:footer>
              <v-pagination
                v-model:page="currentPage"
                :length="Math.ceil(totalNoticias / itemsPerPage)"
                :total-visible="7"
                class="my-4"
              ></v-pagination>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </transition>
  </v-container>
</template>

<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import VueDatePicker from 'vue3-datepicker';


export default defineComponent({
  name: 'noticiasAPI',
  components: {
    VueDatePicker
  },
  data() {
    return {
      noticias: [], 
      headers: [
        { text: 'Título da Notícia', value: 'titulo' },
        { text: 'Data de Publicação', value: 'data_publicacao' },
        { text: 'Link da Notícia', value: 'link' }
      ],
      startDate: '',
      endDate: '',
      showTable: false,
      itemsPerPage: 10,
      currentPage: 1,
      totalNoticias: 0 
    };
  },
  methods: {
    async fetchNoticias() {
      if (!this.startDate || !this.endDate) {
        alert('Por favor, selecione ambas as datas.');
        return;
      }

      const formattedStartDate = this.dataFormatadaForApi(this.startDate);
      const formattedEndDate = this.dataFormatadaForApi(this.endDate);

      try {
        const response = await axios.get(
          `http://servicodados.ibge.gov.br/api/v3/noticias/?de=${formattedStartDate}&ate=${formattedEndDate}`
        );
        this.noticias = response.data.items.map((noticia) => ({
          id: noticia.id,
          titulo: noticia.titulo,
          data_publicacao: noticia.data_publicacao,
          link: noticia.link 
        }));

        this.totalNoticias = this.noticias.length;
        this.showTable = this.noticias.length > 0;

        if (!this.showTable) {
          alert('Nenhuma notícia encontrada para o intervalo de datas selecionado.');
        }
      } catch (error) {
        alert('Erro ao buscar notícias. Por favor, tente novamente.');
      }
    },
    dataFormatada(date) {
      if (!date) return '';
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(date).toLocaleDateString('pt-BR', options);
    },
    dataFormatadaForApi(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${(d.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
    }
  }
});
</script>

<style scoped>
.date-picker-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.date-picker-input {
  border: 1px solid #cccccc;
  padding: 8px;
  border-radius: 4px;
  background-color: #ffffff;
}

.date-picker-button {
  padding: 8px 16px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
}

.date-picker-button:hover {
  background-color: #0056b3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.news-link {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

.news-link:hover {
  text-decoration: underline;
}
</style>

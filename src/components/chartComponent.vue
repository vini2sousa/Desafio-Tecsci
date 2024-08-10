<template>
  <div class="chart-wrapper">
    <button
      @click="toggleChart"
      class="generate-chart-button"
      :class="{ 'button-below': showChart }"
    >
      {{ showChart ? 'Recolher Gráfico' : 'Gerar Gráfico' }}
    </button>
    <transition name="slide-fade">
      <div v-if="showChart" class="chart-container">
        <div class="date-picker-container">
          <vue-date-picker
            v-model="startDate"
            format="yyyy-MM-dd"
            placeholder="Início"
            class="date-picker-input"
          />
          <vue-date-picker
            v-model="endDate"
            format="yyyy-MM-dd"
            placeholder="Fim"
            class="date-picker-input"
          />
          <button class="date-picker-button" @click="updateChart">Aplicar Filtro</button>
        </div>
        <div ref="container" class="chart-content"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import { defineComponent, ref, nextTick } from 'vue';
import Highcharts from 'highcharts';
import VueDatePicker from 'vue3-datepicker';
import data from '@/assets/data.json';

export default defineComponent({
  name: 'chartComponent',
  components: {
    VueDatePicker
  },
  setup() {
    const container = ref(null);
    const startDate = ref('');
    const endDate = ref('');
    const chart = ref(null);
    const showChart = ref(false);

    const filterData = () => {
      if (!startDate.value || !endDate.value) return data;
      const start = new Date(startDate.value).getTime();
      const end = new Date(endDate.value).getTime();
      return data.filter(item => {
        const itemTime = new Date(item.datetime).getTime();
        return itemTime >= start && itemTime <= end;
      });
    };

    const updateChart = () => {
      const filteredData = filterData().map(item => [new Date(item.datetime).getTime(), item.value]);

      if (chart.value) {
        chart.value.update({
          series: [{
            name: 'Valores ao Longo do Tempo',
            data: filteredData
          }]
        });
      }
    };

    const generateChart = async () => {
      chart.value = Highcharts.chart(container.value, {
        chart: {
          backgroundColor: '#2c2c2c',
          borderRadius: 10
        },
        title: {
          text: 'Gráfico Interativo com Highcharts',
          style: {
            color: '#ffffff'
          }
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Data',
            style: {
              color: '#ffffff'
            }
          },
          gridLineColor: '#444444'
        },
        yAxis: {
          title: {
            text: 'Valor',
            style: {
              color: '#ffffff'
            }
          },
          gridLineColor: '#444444'
        },
        series: [{
          name: 'Valores ao Longo do Tempo',
          data: filterData().map(item => [new Date(item.datetime).getTime(), item.value]),
          color: '#00aaff'
        }],
        legend: {
          itemStyle: {
            color: '#ffffff'
          }
        }
      });
    };

    const toggleChart = async () => {
      if (showChart.value) {
        showChart.value = false;
      } else {
        showChart.value = true;
        await nextTick(); 
        generateChart();
      }
    };

    return {
      container,
      startDate,
      endDate,
      updateChart,
      toggleChart,
      showChart
    };
  }
});
</script>

<style scoped>
.chart-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 10px; 
}


.generate-chart-button {
  position: relative; 
  margin-bottom: 10px; 
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  z-index: 10;
  transition: transform 0.3s ease; 
}

.button-below {
  position: absolute;
  top: 540px; 
  margin-top: 10px; 
}

.generate-chart-button:hover {
  background-color: #0056b3;
}

.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 400px;
  padding: 0;
  background-color: #2c2c2c; 
  border-radius: 10px; 
  box-shadow: none;
  overflow: hidden;
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.slide-fade-enter, .slide-fade-leave-to  {
  opacity: 0;
  transform: translateY(20px);
}

.date-picker-container {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
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

.chart-content {
  width: 100%;
  height: 100%;
}
</style>

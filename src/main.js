
import { registerPlugins } from '@/plugins'
import router from './router';
import App from './App.vue'
import { createApp } from 'vue'
import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';

const app = createApp(App)
app.use(HighchartsVue, { Highcharts });
registerPlugins(app)

app.use(router)

app.mount('#app')

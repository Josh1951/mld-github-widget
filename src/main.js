import Vue from 'vue'
import App from './App.vue'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import fontawesome from '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');

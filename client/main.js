import Vue from 'vue'
import App from './App.vue'
import Connect from "./assets/js/network";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// Connect to wss
Connect();

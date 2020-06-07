import Vue from 'vue'
import App from './App.vue'
import Network from "./assets/js/network";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

// Connect to wss
Network.connect();

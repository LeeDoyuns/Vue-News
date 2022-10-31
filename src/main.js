import Vue from 'vue'
import App from '@/App.vue'
//import Codemirror from "vue-codemirror";


Vue.config.productionTip = false
//Vue.use(Codemirror);

new Vue({
  render: h => h(App),
}).$mount('#app')

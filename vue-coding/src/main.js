import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Cell from './components/Cell.vue'

Vue.config.productionTip = false

Vue.component('Cell', Cell)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

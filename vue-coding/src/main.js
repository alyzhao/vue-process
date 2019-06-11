import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Cell from './components/Cell.vue'
import query from './plugins/query.js'
console.log(query.install)

Vue.config.productionTip = false

Vue.component('Cell', Cell)

/* 自定义指令全局注册
Vue.directive('focus', {
  inserted: el => {
    el.focus()
  }
})
*/


Vue.use(query)

// console.log(Vue.getAllParams())

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Slot from  './views/slot/Index.vue'
import Template from './views/template/Index.vue'
import ComputedWatch from './views/computed-watch/Index.vue'
import Vif from './views/v-if/Index.vue'
import Events from './views/events/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/slot',
      name: 'Slot',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Slot
    },
    {
      path: '/template',
      name: 'Template',
      component: Template
    },
    {
      path: '/computed-watch',
      name: 'ComputedWatch',
      component: ComputedWatch
    },
    {
      path: '/v-if',
      name: 'Vif',
      component: Vif
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    }
  ]
})

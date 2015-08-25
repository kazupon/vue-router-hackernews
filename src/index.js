/**
 * Boot up the Vue instance and wire up the router.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import route from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  hashbang: true,
  history: false
})
route(router)


const App = Vue.extend(require('./app.vue'))

router.start(App, '#app')

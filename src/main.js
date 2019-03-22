import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
//importas firebase
import './firebase'

import { routes } from './routes'

import "babel-polyfill"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

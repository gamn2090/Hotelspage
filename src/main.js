import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
//importas firebase
import './firebase'

import $ from "jquery"

import { routes } from './routes'

import "babel-polyfill"

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDeI8EoKoZaULOCXy5g_AK-m7o0oUD9ytQ"
  }
});

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

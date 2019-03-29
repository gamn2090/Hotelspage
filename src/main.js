import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
//importas firebase
import './firebase'
import { auth } from '@/firebase.js'

import "jquery"

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

router.beforeEach((to, from, next) => {
  let usuario = auth.currentUser;
  console.log(usuario);
  let autorizacion = to.matched.some(record => record.meta.autentificado);

  if (autorizacion && !usuario) {

    next('Home')

  } else if (!autorizacion && usuario) {

    next('Dashboard');

  } else {

    next();

  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

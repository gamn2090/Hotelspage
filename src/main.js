import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
//importas firebase
import './firebase'
import { auth } from '@/firebase.js'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/es'

import "jquery"

import { routes } from './routes'

import "babel-polyfill"

import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(Element, {locale})

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDeI8EoKoZaULOCXy5g_AK-m7o0oUD9ytQ"
  }
});

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
});

router.beforeEach((to, from, next) => {
  let usuario = auth.currentUser;
  //console.log(usuario);
  let autorizacion = to.matched.some(record => record.meta.autentificado);

  if (autorizacion && !usuario) {

    next('Home')

  } else if (!autorizacion && usuario) {

    next('Dashboard');

  } else {

    next();

  }
})

auth.onAuthStateChanged(function(user){

  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })

});


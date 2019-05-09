/*Instancias VUE */
import Vue from 'vue'
import App from './App.vue'
/*Importas y usas VueRouter */
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import { aos } from '../public/assets/js/jquery.stellar.min.js'
Vue.use(aos);

//importas y usas firebase
import './firebase'
import { auth } from '@/firebase.js'
/* importas y usas Element UI */
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/es'
Vue.use(Element, {locale})

/*importas JQuery */
import "jquery"

/*importas las rutas */
import { routes } from './routes'
/*importas babel */
import "babel-polyfill"
/*importas y usas vueGoogleMaps */
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDeI8EoKoZaULOCXy5g_AK-m7o0oUD9ytQ"
  }
});

/*instanciamos las rutas*/
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


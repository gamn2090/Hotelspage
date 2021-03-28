/*Instancias VUE */
import Vue from 'vue'
import App from './App.vue'
/*Importas y usas VueRouter */
import VueRouter from 'vue-router'
Vue.use(VueRouter);

import store from "./store";

//importo el modal
import VModal from 'vue-js-modal' 
Vue.use(VModal)

import vWow from 'v-wow'
Vue.use(vWow);

//importo font awesome

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas,far)

Vue.component('font-awesome-icon', FontAwesomeIcon)

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

import VueSignaturePad from 'vue-signature-pad';
Vue.use(VueSignaturePad);
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
    if (to.hash) {
       const algoasi = document.querySelector(to.hash)
       algoasi && (algoasi.scrollIntoView())
       return { selector: to.hash };
    }else{
       return { x: 0, y: 0 }
    }
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
});

store.dispatch("GET_HOTELS")
  .then(() => {

    auth.onAuthStateChanged(function(user){
      new Vue({
        el: '#app',
        router,
        store,
        render: h => h(App)
      });
    });

  })
  .catch(console.error);
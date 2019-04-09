import Home from "@/views/Home.vue";
import Hotel from "@/views/Hotel.vue";
import Reservas from "@/views/Reservas.vue";
import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue";
import Galeria from "@/views/Galeria.vue";
import Contactanos from "@/views/Contactanos.vue";


export const routes = [
         {
           //redirecciono al home siempre que la ruta no exista
           path: "*",
           redirect: "/"
         },
         {
           //el forward slash es el home
           path: "/",
           name: "Home",
           component: Home
         },
         {
           //pantalla de login
           path: "/login",
           name: "Login",
           component: Login
         },
         {
           //pantalla de contactanos
           path: "/contactanos",
           name: "Contactanos",
           component: Contactanos
         },
         {
           //ruta para vista única de hoteles
           path: "/Hoteles/:key",
           component: Hotel,
           name: "hotel"
         },
         {
           //ruta para vista única de promociones
           path: "/Reservas/:hotel/:promo",
           component: Reservas,
           name: "reservas"
         },
         {
           //ruta para vista única de galería
           path: "/Galeria/:key",
           component: Galeria,
           name: "galeria"
         } /*=========================================RUTAS DE ADMIN==========================================*/,
         {
           //dashboard del administrador **protegido**
           path: "/dashboard",
           name: "Dashboard",
           component: Dashboard,
           meta: {
             autentificado: true
           },
           children: [
             {
               path: '/',
               redirect: "profile",
               component: Profile
             },
             {
               path: 'profile',
               component: Profile
             },
             {
                path: 'content',
                component: Content
             }
           ]
         }
       ];
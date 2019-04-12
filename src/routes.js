import Home from "@/views/Home.vue";
import Hotel from "@/views/Hotel.vue";
import Reservas from "@/views/Reservas.vue";
import Habitacion from "@/views/Habitacion.vue";
import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue";
import Galeria from "@/views/Galeria.vue";
import Contactanos from "@/views/Contactanos.vue";

import Profile from "@/components/Admin/profile.vue";
/* hotels */
import CreateHotels from "@/components/Admin/Hotels/Create.vue";
import UpdateHotels from "@/components/Admin/Hotels/Update.vue";
import DeleteHotels from "@/components/Admin/Hotels/Delete.vue";
/* promotions */
import CreatePromotions from "@/components/Admin/Promotions/Create.vue";
import UpdatePromotions from "@/components/Admin/Promotions/Update.vue";
import DeletePromotions from "@/components/Admin/Promotions/Delete.vue";
/* pictures */
import CreatePictures from "@/components/Admin/Pictures/Create.vue";
import UpdatePictures from "@/components/Admin/Pictures/Update.vue";
import DeletePictures from "@/components/Admin/Pictures/Delete.vue";
/* rooms */
import CreateRooms from "@/components/Admin/Rooms/Create.vue";
import UpdateRooms from "@/components/Admin/Rooms/Update.vue";
import DeleteRooms from "@/components/Admin/Rooms/Delete.vue";


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
         },
         {
           //ruta para vista única de promociones
           path: "/Habitacion/:hotel/:hab",
           component: Habitacion,
           name: "habitacion"
         },
         /*=========================================RUTAS DE ADMIN==========================================*/ {
           //dashboard del administrador **protegido**
           path: "/dashboard",
           name: "Dashboard",
           component: Dashboard,
           meta: {
             autentificado: true
           },
           children: [
             {
               path: "/",
               redirect: "profile",
               component: Profile
             },
             {
               path: "profile",
               component: Profile
             },
             /*hoteles*/
             {
               path: "hotel/create",
               component: CreateHotels
             },
             {
               path: "hotel/update",
               component: UpdateHotels
             },
             {
               path: "hotel/delete",
               component: DeleteHotels
             },
             /*promociones */
             {
               path: "promociones/create",
               component: CreatePromotions
             },
             {
               path: "promociones/update",
               component: UpdatePromotions
             },
             {
               path: "promociones/delete",
               component: DeletePromotions
             },
             /*habitaciones */
             {
               path: "habitaciones/create",
               component: CreateRooms
             },
             {
               path: "habitaciones/update",
               component: UpdateRooms
             },
             {
               path: "habitaciones/delete",
               component: DeleteRooms
             },
             /*fotos */
             {
               path: "fotos/create",
               component: CreatePictures
             },
             {
               path: "fotos/update",
               component: UpdatePictures
             },
             {
               path: "fotos/delete",
               component: DeletePictures
             }
           ]
         }
       ];
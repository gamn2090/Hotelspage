import Home from "@/views/Home.vue";
import Hotel from "@/views/Hotel.vue";
import Reservas from "@/views/Reservas.vue";
import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue";
import Galeria from "@/views/Galeria.vue";


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
            //ruta para vista única de hoteles
            path: "/Hoteles/:key",            
            component: Hotel,
            name: "hotel"
        },
        {
            //ruta para vista única de promociones
            path: "/Reservas/:key",
            component: Reservas,
            name: "reservas"
        },
        {
           //ruta para vista única de galería
           path: "/Galeria/:key",
           component: Galeria,
           name: "galeria"
        }, /*=========================================RUTAS DE ADMIN==========================================*/
        {
            //dashboard del administrador **protegido**
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard,
            meta: {
                autentificado: true
            }
        },
       ];
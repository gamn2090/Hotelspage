import Home from "@/views/Home.vue";
import Hotel from "@/views/Hotel.vue"
import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue"

import { auth } from '@/firebase.js'

export const routes = [
    {
        path: '*',
        redirect: "/"
    },
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: {
            autentificado: true
        }
    },
    {
        path: "/Hoteles/:key",
        component: Hotel,
        name: "hotel"
    }
];
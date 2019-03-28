import Home from "@/views/Home.vue";
import Hotel from "@/views/Hotel.vue"

export const routes = [
    {
        path: '*',
        redirect: "/"
    },
    {
        path: "/",
        component: Home
    },
    {
        path: "/Hoteles/:key",
        component: Hotel,
        name: "hotel"
    }
];



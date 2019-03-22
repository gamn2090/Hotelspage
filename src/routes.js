import Home from "./views/Home.vue";
import Promos from "@/components/Promociones"

export const routes = [
    {
        path: "/",
        component: Home
    }, {
        path: "/promociones/:key",
        component: Promos,
        name: "show-promos"
    }
]



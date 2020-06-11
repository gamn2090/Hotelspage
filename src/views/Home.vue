<template>
  <span>
    <navbar></navbar>
    <banner></banner>
    <hoteles></hoteles>
    <promociones></promociones> 
    <nosotros></nosotros>
    <caracteristicas></caracteristicas>
    <parallax></parallax>
    <fotos></fotos>
    <!-- <opiniones></opiniones> --><!-- se la quito por ahora hasta que me den opiniones reales-->
    <maps></maps>
    <my-footer></my-footer>
  </span>
</template>

<script>
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
import Banner from "@/components/Home/Banner.vue";
import Hoteles from "@/components/Home/Hoteles";
import Promociones from "@/components/Home/Promociones";
import Nosotros from "@/components/Home/Nosotros";
import Caracteristicas from "@/components/Home/Caracteristicas";
import Parallax from "@/components/Home/Parallax";
import Fotos from "@/components/Home/Fotos";
import Opiniones from "@/components/Home/Opiniones";
import Maps from "@/components/Home/Maps";

export default {
  name: "home",
  components: {
    Banner,
    Hoteles,
    Promociones,
    Nosotros,
    Caracteristicas,
    Parallax,
    Fotos,
    Opiniones,
    Maps,
    MyFooter,
    Navbar
  }
};
</script>

<style scoped> 
    .active{
        background-color: #fff !important;
    }
</style>
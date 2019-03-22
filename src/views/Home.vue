<template>
  <span>
    <Navbar></Navbar>
    <Banner></Banner>
    <Hoteles></Hoteles>
    <!--<Promociones></Promociones> -->
    <Nosotros></Nosotros>
    <Caracteristicas></Caracteristicas>
    <parallax></parallax>
    <Fotos></Fotos>
    <Opiniones></Opiniones>
    <Maps></Maps>
    <my-footer></my-footer>
  </span>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Banner from "@/components/Banner.vue";
import Hoteles from "@/components/Hoteles";
import Promociones from "@/components/Promociones";
import Nosotros from "@/components/Nosotros";
import Caracteristicas from "@/components/Caracteristicas";
import Parallax from "@/components/Parallax";
import Fotos from "@/components/Fotos";
import Opiniones from "@/components/Opiniones";
import Maps from "@/components/Maps";
import MyFooter from "@/components/MyFooter";

export default {
  name: "home",
  components: {
    Navbar,
    Banner,
    Hoteles,
    Promociones,
    Nosotros,
    Caracteristicas,
    Parallax,
    Fotos,
    Opiniones,
    Maps,
    MyFooter
  }
};
</script>

<style scoped> 
</style>
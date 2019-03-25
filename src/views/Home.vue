<template>
  <span>
    <Navbar></Navbar>
    <Banner></Banner>
    <Hoteles></Hoteles>
    <Promociones></Promociones> 
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
import Navbar from "@/components/Home/Navbar.vue";
import Banner from "@/components/Home/Banner.vue";
import Hoteles from "@/components/Home/Hoteles";
import Promociones from "@/components/Home/Promociones";
import Nosotros from "@/components/Home/Nosotros";
import Caracteristicas from "@/components/Home/Caracteristicas";
import Parallax from "@/components/Home/Parallax";
import Fotos from "@/components/Home/Fotos";
import Opiniones from "@/components/Home/Opiniones";
import Maps from "@/components/Home/Maps";
import MyFooter from "@/components/Home/MyFooter";

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
<template>
  <span>
    <Banner></Banner>
    <Hoteles></Hoteles>
    <Promociones></Promociones> 
    <Nosotros></Nosotros>
    <Caracteristicas></Caracteristicas>
    <parallax></parallax>
    <Fotos></Fotos>
    <Opiniones></Opiniones>
    <Maps></Maps>
  </span>
</template>

<script>
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
  }
};
</script>

<style scoped> 
</style>
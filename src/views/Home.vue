<template>
  <span >
    <navbar></navbar>
    <banner></banner>
    <hoteles></hoteles>
    <nosotros></nosotros>
    <parallax></parallax>
    <promociones></promociones>
    <wcheckin></wcheckin>
    <lang></lang>
    <whatsapp></whatsapp>
    <fb-messenger></fb-messenger>
    <!-- <opiniones></opiniones> --><!-- se la quito por ahora hasta que me den opiniones reales-->
    <maps></maps>
    <my-footer></my-footer>
  </span>
</template>

<script>

import FbMessenger from '@/components/Home/FbMessenger';
import MyFooter from '@/components/Home/MyFooter';
import Wcheckin from '@/components/Home/Wcheckin';
import Lang from '@/components/Home/Lang';
import Whatsapp from '@/components/Home/Whatsapp';
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
    FbMessenger,
    Nosotros,
    Caracteristicas,
    Wcheckin,
    Lang,
    Parallax,
    Fotos,
    Opiniones,
    Maps,
    MyFooter,
    Navbar,
    Whatsapp
  },
  data () {
      return {
               
      }    
    },
    
};
</script>

<style scoped> 
    .active{
        background-color: #fff !important;
    }
</style>
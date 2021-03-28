<template>
  <span>    
    <navbar></navbar>
    <banner :routeName="routeName"></banner>           
    <fotos></fotos>
    <wcheckin></wcheckin>
    <whatsapp></whatsapp>
    <my-footer></my-footer>   

  </span>
</template>

<script>
import Wcheckin from '@/components/Home/Wcheckin';
import Whatsapp from '@/components/Home/Whatsapp';
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
import Banner from "@/components/Home/Banner";
import Fotos from "@/components/Galeria/Fotos";

export default {
  name: "hotel",
  data () {
      return {
        routeName: 'GALERÍA'
      }
  },
  components: {    
    Banner, 
    Wcheckin,  
    Fotos,
    MyFooter,
    Navbar,
    Whatsapp
  }
};
</script>

<style scoped> 
</style>
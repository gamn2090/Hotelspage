<template>
  <span>    
    <navbar></navbar>
    <banner></banner>           
    <fotos></fotos>
    <my-footer></my-footer>   
  </span>
</template>

<script>
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
import Banner from "@/components/Home/Banner";
import Fotos from "@/components/Galeria/Fotos";

export default {
  name: "hotel",
  components: {    
    Banner,   
    Fotos,
    MyFooter,
    Navbar
  }
};
</script>

<style scoped> 
</style>
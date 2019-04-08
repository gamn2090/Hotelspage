<template>
  <span>
    <navbar></navbar>
    <banner></banner>           
    <my-contacto></my-contacto>    
    <my-footer></my-footer> 
  </span>
</template>

<script>
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
import Banner from "@/components/Home/Banner";
import MyContacto from "@/components/Contactanos/Contactanos";

export default {
  name: "Contactanos",
  components: {    
    Banner,   
    MyContacto,
    MyFooter,
    Navbar
  }
};
</script>

<style scoped> 
.sub-heading{
      color: black !important;
    }
</style>
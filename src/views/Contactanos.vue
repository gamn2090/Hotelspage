<template>
  <span>    
    <banner></banner>           
    <my-contacto></my-contacto>    
  </span>
</template>

<script>
import Banner from "@/components/Home/Banner";
import MyContacto from "@/components/Contactanos/Contactanos";

export default {
  name: "Contactanos",
  components: {    
    Banner,   
    MyContacto
  }
};
</script>

<style scoped> 
.sub-heading{
      color: black !important;
    }
</style>
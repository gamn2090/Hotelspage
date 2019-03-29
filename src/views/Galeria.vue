<template>
  <span>    
    <banner></banner>           
    <fotos></fotos>    
  </span>
</template>

<script>
import Banner from "@/components/Home/Banner";
import Fotos from "@/components/Galeria/Fotos";

export default {
  name: "hotel",
  components: {    
    Banner,   
    Fotos
  }
};
</script>

<style scoped> 
</style>
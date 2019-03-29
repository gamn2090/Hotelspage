<template>
    <h1>hola soy vaqrtan y gustavop pudo hacer lo que sho no XC</h1>
</template>
<template>
  <span>    
    <hoteles></hoteles>    
    <promociones></promociones>    
    <habitaciones></habitaciones>    
    <caracteristicas></caracteristicas>    
    <fotos></fotos>    
    <my-maps></my-maps>    
  </span>
</template>

<script>
import Hoteles from "@/components/Hotels/Hotel";
import Promociones from "@/components/Hotels/Promociones";
import Habitaciones from "@/components/Hotels/Habitaciones";
import Caracteristicas from "@/components/Hotels/Caracteristicas";
import Fotos from "@/components/Hotels/Fotos";
import MyMaps from "@/components/Hotels/Map";

export default {
  name: "hotel",
  components: {    
    Hoteles    
  }
};
</script>

<style scoped> 
</style>
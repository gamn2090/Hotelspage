<template>
  <span>    
    <hoteles></hoteles>    
    <habitaciones></habitaciones>   
      
  </span>
</template>

<script>
import Hoteles from "@/components/Home/Banner";
import Habitaciones from "@/components/Reservas/Details";

export default {
  name: "hotel",
  data () {
      return {
        promo : null,
      }
  },
  components: {    
    Hoteles,
    Habitaciones    
  },  
  methods: {        
        /*funciones de las promociones */
        getFiles() {
            this.files = this.$refs.files.files
        },
        async getPromos() {           
            try {
                let data = (
                    await db
                    .child("promos")
                    .once("value")                    
                ).val()

                for (let elem in data) {
                    if(elem == this.$route.params.key)
                        this.promos = data[elem];                    
                }           
            } catch (ex) {
                return console.error(ex)
            }
        },
    },
};
</script>

<style scoped> 
</style>
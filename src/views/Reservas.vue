<template>
  <span>    
    <navbar></navbar>    
    <hoteles></hoteles>    
    <habitaciones></habitaciones>   
    <my-footer></my-footer>   
      
  </span>
</template>

<script>
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
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
    Habitaciones,
    MyFooter,
    Navbar    
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
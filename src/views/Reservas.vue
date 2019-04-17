<template>
  <span>    
    <navbar></navbar>    
    <banner :routeName="routeName"></banner>    
    <detalle></detalle>   
    <my-footer></my-footer>   
      
  </span>
</template>

<script>
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
import Banner from "@/components/Home/Banner";
import Detalle from "@/components/Reservas/Details";

export default {
  name: "Reservas",
  data () {
      return {
        promo : null,
        routeName: 'REALICE SU RESERVA'
      }
  },
  components: {    
    Detalle,
    Banner,
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
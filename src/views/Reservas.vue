<template>
  <span>    
    <navbar></navbar>    
    <banner :routeName="routeName"></banner>
    <wcheckin></wcheckin>    
    <detalle></detalle>   
    <my-footer></my-footer>   
    <whatsapp></whatsapp>
  </span>
</template>

<script>
import Wcheckin from '@/components/Home/Wcheckin';
import Whatsapp from '@/components/Home/Whatsapp';
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
    Wcheckin,
    Banner,
    MyFooter,
    Navbar,
    Whatsapp    
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
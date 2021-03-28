<template>
  <span>    
    <navbar></navbar>    
    <banner :routeName="routeName"></banner>    
    <detalle :habs="habs"></detalle>   
    <wcheckin></wcheckin>
    <whatsapp></whatsapp>
    <my-footer></my-footer>
  </span>
</template>

<script>
import { db } from '@/firebase.js'
import Wcheckin from '@/components/Home/Wcheckin';
import Whatsapp from '@/components/Home/Whatsapp';
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
import Banner from "@/components/Home/Banner";
import Detalle from "@/components/Reservas/Habitaciones";

export default {
  name: "Habitaciones",
  data () {
      return {
        habs : null,
        promo : null,
        routeName: 'SELECCIONE SU HABITACIÓN'
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
        async getHabs() {
           try {
                this.habs = (
                    await db
                    .child("rooms")
                    .orderByChild('hotel')
                    .equalTo(this.$route.params.key)
                    .once("value")
                ).val()                                          
                    
            } catch (ex) {
                return console.error(ex)
            }          
        },
    },
    async mounted () {       
        await this.getHabs()        
    },
    watch : {
        $route (to, from){                      
            this.habs =[],            
            this.getHabs()
        }
    }
};
</script>

<style scoped> 
</style>
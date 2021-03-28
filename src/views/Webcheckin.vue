<template>
  <span>    
    <navbar></navbar>    
    <banner :routeName="routeName"></banner>    
    <detalle></detalle>  
    <whatsapp></whatsapp> 
    <my-footer></my-footer> 
  </span>
</template>

<script>
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
import Whatsapp from '@/components/Home/Whatsapp';
import Banner from "@/components/Home/Banner";
import Detalle from "@/components/Reservas/Webchecking";
import { db } from '@/firebase.js'

export default {
  name: "Reservas",
  components: {    
    Detalle,
    Banner,
    MyFooter,
    Navbar,
    Whatsapp   
  },  
  data () {
      return {
      /*data para los hoteles */
        hotelData : null,
        hotel : null,
        routeName: 'Realizar Reserva',      
      }    
    },
    methods: {
        /*funciones de los hoteles */
        async getHotelData() {
           try {
                this.hotelData = (
                    await db
                    .child("tambohotels")
                    .once("value")                    
                ).val()
                
                this.hotel = this.$route.params.key;                 
                console.log                          
            } catch (ex) {
                return console.error(ex)
            }          
        }    
    },
    async created () {
        await this.getHotelData()
    },
    watch : {
        $route (to, from){
            this.hotel = null,           
            this.getHotelData()      
        }
    }       
};
</script>

<style scoped> 
</style>
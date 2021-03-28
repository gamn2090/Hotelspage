<template>
  <span>    
    <navbar></navbar>    
    <banner :routeName="routeName"></banner>    
    <detalle :hotelData="hotelData" ></detalle>  
    <wcheckin></wcheckin>
    <my-footer></my-footer>   
    <whatsapp></whatsapp>

  </span>
</template>

<script>
import Wcheckin from '@/components/Home/Wcheckin';

import MyFooter from '@/components/Home/MyFooter';
import Whatsapp from '@/components/Home/Whatsapp';
import Navbar from '@/components/Home/Navbar';
import Banner from "@/components/Home/Banner";
import Detalle from "@/components/Reservas/Checkin";
import { db } from '@/firebase.js'

export default {
  name: "Reservas",
  components: {    
    Detalle,
    Wcheckin,
    Banner,
    MyFooter,
    Navbar   ,
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
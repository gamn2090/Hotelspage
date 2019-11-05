<template>
  <span>
    <navbar></navbar>
    <banner :routeName="routeName"></banner>           
    <my-contacto :hotelData="hotelData" ></my-contacto>    
    <my-footer></my-footer> 
  </span>
</template>

<script>
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
import Banner from "@/components/Home/Banner";
import MyContacto from "@/components/Contactanos/Contactanos";
import { db } from '@/firebase.js'

export default {
  name: "Contactanos",
  data () {
      return {
        routeName: 'CONTÁCTANOS',
        hotelData: null
      }
  },
  components: {    
    Banner,   
    MyContacto,
    MyFooter,
    Navbar
  }, 
  methods: {
    async selectHotel ( hotel ) {            
      try {
          let data = (
              await db
              .child("tambohotels")
              .once("value")                    
          ).val()

          for (let elem in data) {
              if(elem == hotel)
              {    
                  this.hotelData = data[elem]; 
              }
              console.log(this.hotelData)
          }       
      } catch (ex) {
          return console.error(ex)
      }            
    },
  },
  async created () {
    await this.selectHotel(this.$route.params.key)
  },    
    watch : {
      $route (to, from){          
          this.selectHotel(this.$route.params.key)  
      }
    }
};
</script>

<style scoped> 
.sub-heading{
      color: black !important;
    }
</style>
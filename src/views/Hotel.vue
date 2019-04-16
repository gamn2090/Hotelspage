<template>
  <span>    
    <navbar></navbar>    
    <banner></banner>    
    <promociones :todasPromos="todasPromos" :hotel="hotel"></promociones>    
    <habitaciones :habs="habs" :hotel="hotel"></habitaciones>    
    <caracteristicas></caracteristicas>    
    <fotos :fotos="fotos" :images="images" :index="index"></fotos>    
    <my-maps></my-maps>    
    <my-footer></my-footer>    
  </span>
</template>

<script>
import { db } from '@/firebase.js'

import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
import Banner from "@/components/Home/Banner";
import Promociones from "@/components/Hotels/Promociones";
import Habitaciones from "@/components/Hotels/Habitaciones";
import Caracteristicas from "@/components/Hotels/Caracteristicas";
import Fotos from "@/components/Hotels/Fotos";
import MyMaps from "@/components/Hotels/Map";

export default {
  name: "hotel",
  components: {    
    Banner,
    Promociones,
    Habitaciones,
    Caracteristicas,
    Fotos,
    MyMaps,
    MyFooter,
    Navbar
  },
  data () {
      return {
        /*data para los hoteles */
        hotel : null,
        /*data para el map*/ 
        center: {lat: -12.1259781, lng: -77.0328962},
        markers: [{
            position: {lat: -12.1259781, lng: -77.0328962},
            label:{text:"El Tambo UNO",color:"black",fontSize:"16px",fontWeight:"bold"}
            }
        ],
        /*data para las promociones*/
        files: [],
        todasPromos: [],
        promosOnChildAdded: null,
        promosOnChildRemoved: null,
        promosRef: db.child("promos"),
        /*data para las fotos */
        fotos: [],
        images: [],
        index : null,
        /*data para habitaciones */
        habs: [],
        habsRef: db.child("habitaciones")
      }    
    },
    methods: {
        /*funciones de los hoteles */
        async getHotelData() {
           try {
                let data = (
                    await db
                    .child("tambohotels")
                    .once("value")                    
                ).val()

                this.hotel = this.$route.params.key;                   
                           
            } catch (ex) {
                return console.error(ex)
            }          
        },
        /*funciones de las promociones */
        getFiles() {
            this.files = this.$refs.files.files
        },
        async getPromos() {           
                this.promosOnChildAdded = this.promosRef
                    .orderByChild('hotel')
                    .equalTo(this.$route.params.key)
                    .on("child_added", snapshot => {
                    const data = snapshot.val()
                    const key = snapshot.key
                    data.key = key
                    this.todasPromos.push(data);                  
                })                   

                this.promosOnChildRemoved = this.promosRef.on("child_removed", snapshot => {
                    const index = this.promos.findIndex(e => e.key == snapshot.key)
                    this.promos.splice(index, 1)
                }) 
        },                            
        /*funciones de la galería (fotos) */
        async getFotos() {
           try {
                let Data = (
                    await db
                    .child("fotos")
                    .once("value")                    
                ).val()
                let i = 0;
                for (var elem in Data) {
                    if(Data[elem].hotel == this.$route.params.key){
                        this.fotos.push(Data[elem]);
                        i++                        
                    }
                    if(i > 7)
                        break                                            
                }
                for (var foto in this.fotos) {
                    this.images.push(this.fotos[foto].image);                    
                }   
                //console.log(this.images) 
            } catch (ex) {
                return console.error(ex)
            } 
        },
        /*funciones para habitaciones */
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
    async created () {
        await this.getPromos(),
        await this.getHotelData(),
        await this.getHabs(),
        await this.getFotos()
    },
    beforeDestroy() {
        this.promosRef.off("child_added", this.promosOnChildAdded)
        this.promosRef.off("child_removed", this.promosOnChildRemoved)
    },    
    watch : {
        $route (to, from){
            this.hotel = null,
            this.files = [],
            this.todasPromos = [],
            this.fotos = [],
            this.images = [],
            this.habs =[],
            this.getPromos(),  
            this.getHotelData(),
            this.getHabs(),                
            this.getFotos()
    
    }
} 
      
};
</script>

<style scoped> 
</style>
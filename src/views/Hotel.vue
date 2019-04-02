<template>
  <span>    
    <hoteles :hotel="hotel"></hoteles>    
    <promociones :todasPromos="todasPromos"></promociones>    
    <habitaciones></habitaciones>    
    <caracteristicas></caracteristicas>    
    <fotos :fotos="fotos" :images="images" :index="index"></fotos>    
    <my-maps></my-maps>    
  </span>
</template>

<script>
import { db } from '@/firebase.js'
//importo el owl carousel
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";

import Hoteles from "@/components/Hotels/Hotel";
import Promociones from "@/components/Hotels/Promociones";
import Habitaciones from "@/components/Hotels/Habitaciones";
import Caracteristicas from "@/components/Hotels/Caracteristicas";
import Fotos from "@/components/Hotels/Fotos";
import MyMaps from "@/components/Hotels/Map";

export default {
  name: "hotel",
  components: {    
    Hoteles,
    Promociones,
    Habitaciones,
    Caracteristicas,
    Fotos,
    MyMaps
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

                for (let elem in data) {
                    if(elem == this.$route.params.key)
                        this.hotel = data[elem];                    
                }           
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
    },
    async created () {
        await this.getHotelData(),
        await this.getPromos(),
        await this.getFotos()
    },
    beforeDestroy() {
        this.promosRef.off("child_added", this.promosOnChildAdded)
        this.promosRef.off("child_removed", this.promosOnChildRemoved)
    },
    watch : {
        $route (to, from){
            this.hotel = null,
            this.todasPromos = [],
            this.fotos = [],
            this.getHotelData(),
            this.getPromos(),
            this.getFotos()
            if (this.todasPromos.length > 2) {
                 $('.nonloop-block-15').owlCarousel({ center: false, items: 1, loop: true, stagePadding: 0, autoplay: true, margin: 20, nav: true, dots: true, navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'], responsive: { 600: { margin: 20, stagePadding: 0, items: 1, nav: false, dots: true }, 1000: { margin: 20, stagePadding: 0, items: 2, nav: true, dots: true }, 1200: { margin: 20, stagePadding: 0, items: 3, nav: true, dots: true } } }); 
            }
            else {
                $('.nonloop-block-15').owlCarousel({ center: true, items: 1, loop: false, stagePadding: 0, autoplay: false, margin: 20, nav: true, dots: true, navText: ['<span class="icon-arrow_back">', '<span class="icon-arrow_forward">'], responsive: { 600: { margin: 20, stagePadding: 0, items: 1, nav: false, dots: true }, 1000: { margin: 20, stagePadding: 0, items: 2, nav: true, dots: true }, 1200: { margin: 20, stagePadding: 0, items: 3, nav: true, dots: true } } });
            }
    }
} 
      
};
</script>

<style scoped> 
</style>
<template>
  <span>    
    <navbar ></navbar> 
    <portada :hotelData="hotelData"></portada>   
    <promociones :todasPromos="todasPromos" :hotel="hotelKey"></promociones>
    <habitaciones :habs="habs" :hotel="hotelKey"></habitaciones>    
    <caracteristicas></caracteristicas>    
    <wcheckin></wcheckin>
    <lang></lang>
    <whatsapp></whatsapp>
    <fotos :fotos="fotos" :images="images" :index="index"></fotos>    
    <!--<my-maps :hotelData="hotelData"></my-maps>-->
    <my-footer></my-footer>    
  </span>
</template>

<script>
import { db } from '@/firebase.js'
import Wcheckin from '@/components/Home/Wcheckin';
import Lang from '@/components/Home/Lang';
import Whatsapp from '@/components/Home/Whatsapp';
import MyFooter from '@/components/Home/MyFooter';
import Navbar from '@/components/Home/Navbar';
import Portada from "@/components/Home/Portada";
import Promociones from "@/components/Home/Promociones";
import Habitaciones from "@/components/Hotels/Habitaciones";
import Caracteristicas from "@/components/Home/Caracteristicas";
import Fotos from "@/components/Hotels/Fotos";
import MyMaps from "@/components/Hotels/Map";

export default {
  name: "hotel",
  components: {    
    Portada,
    Wcheckin,
    Promociones,
    Lang,
    Habitaciones,
    Caracteristicas,
    Fotos,
    MyMaps,
    MyFooter,
    Navbar,
    Whatsapp
  },
  data () {
      return {
        /*data para los hoteles */
        routeName: 'DETALLES DEL HOTEL',
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
    computed: {
        hotelKey() {
            return this.$route.params.key;
        },
        hotelData() {
            return this.$store.state.hotels.find(a => a.key == this.hotelKey);
        },
    },
    methods: {
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
    async mounted () {
        await this.getPromos()
        await this.getHabs()
        await this.getFotos()
    },
    beforeDestroy() {
        this.promosRef.off("child_added", this.promosOnChildAdded)
        this.promosRef.off("child_removed", this.promosOnChildRemoved)
    },    
    watch : {
        $route (to, from){
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
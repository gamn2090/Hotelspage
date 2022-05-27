<template>
<div>
    <div id="habitaciones" class="site-section bg-light beige-backgound">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2 v-if="this.datosHotel" class="mb-5">{{$t('SeleccionHab["Titulo"]')}} {{this.datosHotel.name}}</h2>
                </div>
            </div>            
            <div class="row">
                <div v-for="habsData in habs" :key="habsData.key" class="col-lg-12 mb-5">
                    <router-link :to="{ name: 'Reserva-online', params: { key: habsData.key }, hash:'#checkin' } ">                        
                        <div style="border: 2px solid #3ac92a" class="hotel-room">
                            <div class="row">
                                <div class="col-sm-12 col-md-6 col-lg-4">
                                    <img v-if="habsData" style="height:215px; width:100%" :src="habsData.image " :alt="habsData.nombre" class="img-fluid">
                                    <img v-else style="height:215px; width:100%" src='~@/assets/loading.gif' :alt="habsData.nombre" class="img-fluid">
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6  col-lg-4">
                                    <div v-if="$i18n.locale == 'es'" class="hotel-room-body">
                                        <h3 v-if="habsData" class="heading mb-0">{{habsData.nombre}}</h3>
                                        <p v-if="habsData" style="color: grey; text-aling:center">{{habsData.descripcion}}</p>
                                    </div>
                                    <div v-else class="hotel-room-body">
                                        <h3 v-if="habsData" class="heading mb-0">{{habsData.nombre_en}}</h3>
                                        <p v-if="habsData" style="color: grey; text-aling:center">{{habsData.descripcion_en}}</p>
                                    </div>
                                </div>
                                <div class="col-xs-12 col-sm-12 col-md-6 col-lg-4">
                                    <div class="hotel-room-body">
                                        <span v-if="habsData" style="font-size:24px; font-weigth:bolder; color:black; text-aling:center" class="mb-3 ">{{$t('SeleccionHab["Usd"]')}} {{habsData.precioDol}} ó S/{{habsData.precioPen}} </span>
                                        <span style="font-size:11px;" class="mb-3 d-block post-date">{{$t('SeleccionHab["Impuesto"]')}}</span>
                                        <p style="color: black;font-size:13px;">{{$t('SeleccionHab["Tarifa"]')}}</p>
                                        <p style="color: #3ac92a;font-size:16px;">{{$t('SeleccionHab["Incluye"]')}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </router-link>               
                </div> 
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { db } from '@/firebase.js'

export default {
    name: "habitaciones",
    data () {
      return {
        habs: [],
        datosHotel: null,
        habsOnChildAdded: null,
        habsOnChildRemoved: null,
        habsRef: db.child("rooms")
      }
    },
    methods: {
        async getHabs() {           
            this.habsOnChildAdded = this.habsRef
                .orderByChild('hotel')
                .equalTo(this.$route.params.key)
                .on("child_added", snapshot => {
                const data = snapshot.val()
                const key = snapshot.key
                data.key = key
                this.habs.push(data);                  
            })                   

            this.habsOnChildRemoved = this.habsRef.on("child_removed", snapshot => {
                const index = this.habs.findIndex(e => e.key == snapshot.key)
                this.habs.splice(index, 1)
            }) 
        },
        async loadHotel ( ) {            
            try {
                let data = (
                    await db
                    .child("tambohotels")
                    .once("value")                    
                ).val()

                for (let elem in data) {
                    if(elem == this.$route.params.key)
                    {    
                      this.datosHotel = data[elem]; 
                    }
                }   
            } catch (ex) {
                return console.error(ex)
            }          
        },           
    },
    async created () {
        await this.getHabs()
        await this.loadHotel() 
    },     
    beforeDestroy() {
        this.habsRef.off("child_added", this.habsOnChildAdded)
        this.habsRef.off("child_removed", this.habsOnChildRemoved)
    },
    watch : {
        $route (to, from){
            this.habs = [],
            this.habsOnChildAdded = null,
            this.habsOnChildRemoved = null,
            this.getHabs(),
            this.loadHotel()                      
        }
    }
    
}
</script>

<style scoped>
    #habitaciones{
        padding-top:100px !important;
    }
    .sub-heading{
      color: black !important;
    }
</style>
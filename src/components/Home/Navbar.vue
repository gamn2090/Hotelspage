<template>  
    <span>
        <div class="site-mobile-menu">
            <div class="site-mobile-menu-header">
                <div class="site-mobile-menu-close mt-3">
                    <span class="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
            <div class="site-mobile-menu-body">
                <div class="container">
                    <ul class="site-menu d-lg-block"> 
                        <li class="active">
                            <router-link :to="'/'" >Inicio</router-link>
                        </li>                       
                        <li class="has-children">                            
                            <a href="#!" @click="showHotels()" >Hoteles</a>
                            <ul v-if="!this.isHidden">
                                <li v-for="hotelData in hotels" :key="hotelData.key">
                                    <router-link exact :to="{ name: 'hotel', params: { key: hotelData.key } }">
                                        {{hotelData.name}}
                                    </router-link>
                                </li>                                                        
                            </ul>
                        </li>
                        <li v-if="this.$route.params.key || this.$route.params.hotel">
                            <router-link :to="{ name: 'galeria', params: { key: this.$route.params.key || this.$route.params.hotel } }">
                                Galería
                            </router-link>
                        </li>   
                        <li >
                            <router-link :to="'/Reserva-online'">
                                ¡Reserva Ahora!
                            </router-link>
                        </li>   
                        <li class="has-children">                            
                            <a href="#!" @click="showHotelsR()" >¡Contáctanos!</a>
                            <ul v-if="!this.isHiddenR">
                                <li v-for="hotelData in hotels" :key="hotelData.key">
                                    <router-link exact :to="{ name: 'Contactanos', params: { key: hotelData.key } }">
                                        {{hotelData.name}}
                                    </router-link>
                                </li>                                                        
                            </ul>
                        </li>                         
                    </ul>
                </div>
            </div>
        </div>     
        <div class="site-navbar-wrap js-site-navbar bg-white">
            <div class="container">
                <div class="site-navbar bg-light">
                    <div class="py-1">
                        <div class="row align-items-center">
                            <div class="col-2">
                                <h2 class="mb-0 site-logo"> 
                                <router-link :to="'/'" >
                                    <img src='@/assets/logo3.png' alt="El Tambo">                                
                                </router-link></h2>
                            </div>
                           
                            <div class="col-10">
                                <nav class="site-navigation text-right" role="navigation">
                                    <div class="container">
                                        <div class="d-inline-block d-lg-none  ml-md-0 mr-auto py-3"><a href="#!" class="site-menu-toggle js-menu-toggle"><span class="icon-menu h3"></span></a></div>
                                        <ul class="site-menu js-clone-nav d-none d-lg-block">
                                            <li class="active">
                                                <router-link :to="'/'" >Inicio</router-link>
                                            </li>
                                            <li class="has-children">
                                                <a href="#!" >Hoteles</a>                                                                                                
                                                <ul class="dropdown arrow-top ">
                                                    <li v-for="hotelData in hotels" :key="hotelData.key">
                                                        <router-link exact :to="{ name: 'hotel', params: { key: hotelData.key } }">
                                                            {{hotelData.name}}
                                                        </router-link>
                                                    </li>                                                        
                                                </ul>
                                            </li>   

                                            <li v-if="this.$route.params.key || this.$route.params.hotel">
                                                <router-link :to="{ name: 'galeria', params: { key: this.$route.params.key || this.$route.params.hotel } }">
                                                    Galería
                                                </router-link>
                                            </li>                                            

                                            <li class="has-children">
                                                <a href="#!" >Contactanos</a>                                                                                                
                                                <ul class="dropdown arrow-top ">
                                                    <li v-for="hotelData in hotels" :key="hotelData.key">
                                                        <router-link exact :to="{ name: 'Contactanos', params: { key: hotelData.key } }">
                                                            {{hotelData.name}}
                                                        </router-link>
                                                    </li>                                                        
                                                </ul>
                                            </li> 
                                            <li >
                                                <router-link :to="'/Reserva-online'">
                                                    ¡Reserva ahora!
                                                </router-link>
                                            </li>                                                                                           
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </span>
</template>

<script>
import { db, storage } from '@/firebase.js'
import moment from "moment"

export default {
    name: "Navbar",
    data () {
      return {
        isHidden: null,
        isHiddenR: null,
        files: [],
        hotels: [],
        hotelsOnChildAdded: null,
        hotelsOnChildRemoved: null,        
        hotelsRef: db.child("tambohotels")
      }
    },
    methods:{        
        getFiles() {
            this.files = this.$refs.files.files
        },
        getHotels() {
           this.hotelsOnChildAdded = this.hotelsRef.on("child_added", snapshot => {
               const data = snapshot.val()
               const key = snapshot.key
               data.key = key
               this.hotels.push(data)
           })

           this.hotelsOnChildRemoved = this.hotelsRef.on("child_removed", snapshot => {
               const index = this.hotels.findIndex(e => e.key == snapshot.key)
               this.hotels.splice(index, 1)
           })
        },
        showHotels() {
            if(this.isHidden)
                this.isHidden = false
            else
                this.isHidden = true
        },
        showHotelsR() {
            if(this.isHiddenR)
                this.isHiddenR = false
            else
                this.isHiddenR = true
        }
    },  
    created() {
        this.getHotels()
        this.isHidden = false
        //console.log('isHidden es: '+this.$route.params.key)
    },
    beforeDestroy() {
        this.hotelsRef.off("child_added", this.hotelsOnChildAdded)
        this.hotelsRef.off("child_removed", this.hotelsOnChildRemoved)
    }
}

</script>

<style scoped>
    
</style>
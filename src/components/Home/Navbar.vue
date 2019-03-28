<template>  
    <span>
        <div class="site-mobile-menu">
            <div class="site-mobile-menu-header">
                <div class="site-mobile-menu-close mt-3">
                    <span class="icon-close2 js-menu-toggle"></span>
                </div>
            </div>
            <div class="site-mobile-menu-body"></div>
        </div>     
        <div class="site-navbar-wrap js-site-navbar bg-white">
            <div class="container">
                <div class="site-navbar bg-light">
                    <div class="py-1">
                        <div class="row align-items-center">
                            <div class="col-2">
                                <h2 class="mb-0 site-logo"><a href="#!">El Tambo Perú</a></h2>
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
                                                <a href="#!">Hoteles</a>
                                                <ul class="dropdown arrow-top">
                                                    <li v-for="hotelData in hotels" :key="hotelData.key">
                                                        <router-link :to="{ name: 'hotel', params: { key: hotelData.key } }">
                                                            {{hotelData.name}}
                                                        </router-link>
                                                    </li>                                                        
                                                </ul>
                                            </li>
                                            <li><a href="#!">Promociones</a></li>
                                            <li><a href="#!">Conócenos</a></li>
                                            <li><a href="#!">Contactanos</a></li>
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
        files: [],
        hotel: null,
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
        }
    },  
    created() {
        this.getHotels()
    },
    beforeDestroy() {
        this.hotelsRef.off("child_added", this.hotelsOnChildAdded)
        this.hotelsRef.off("child_removed", this.hotelsOnChildRemoved)
    }
}
</script>

<style scoped>
    
</style>
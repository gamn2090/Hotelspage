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
                            <router-link :to="'/'" >{{$t('NavBar["Inicio"]')}}</router-link>
                        </li>                       
                        <li class="has-children">                            
                            <a href="javascript:void(0);" @click="showHotels()" >{{$t('NavBar["Hoteles"]')}}</a>
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
                                {{$t('NavBar["Galeria"]')}}
                            </router-link>
                        </li>   
                        <li >
                            <router-link :to="{ path: '/Web-checkin', hash: '#checkin' }">
                                {{$t('NavBar["WebCheckin"]')}}
                            </router-link>
                        </li>
                          
                        <li class="has-children">                            
                            <a href="javascript:void(0);" @click="showHotelsRes()" >{{$t('NavBar["Reserva"]')}}</a>
                            <ul v-if="!this.isHiddenRes">
                                <li v-for="hotelData in hotels" :key="hotelData.key">
                                    <router-link :to="{ name: 'Seleccion-hotel', params: { key: hotelData.key }, hash:'#habitaciones', }">
                                        {{hotelData.name}}
                                    </router-link>
                                </li>                                                        
                            </ul>
                        </li>
                        <li class="has-children">                            
                            <a href="javascript:void(0);" @click="showHotelsR()" >{{$t('NavBar["Contactanos"]')}}</a>
                            <ul v-if="!this.isHiddenR">
                                <li v-for="hotelData in hotels" :key="hotelData.key">
                                    <router-link exact :to="{ name: 'Contactanos', params: { key: hotelData.key }, hash: '#contactoScroll' }">
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
            <div class="container" style="padding">
                <div class="site-navbar bg-light">
                    <div class="py-1">
                        <div class="row align-items-center">
                            <div class="col-2">
                                <h2 class="mb-0 site-logo"> 
                                <router-link :to="'/'" >
                                
                                    <img v-if="isDefaultImage" class="iconoInicio"
                                    src="~@/assets/tamboBlanco.png"
                                    alt="El Tambo">
                                    <img v-else class="iconoInicio"
                                    src="~@/assets/tamboVerde.png"
                                    alt="El Tambo">                                
                                </router-link></h2>
                            </div>
                           
                            <div class="col-10">
                                <nav class="site-navigation text-right" role="navigation">
                                    <div class="container">
                                        <div class="d-inline-block d-lg-none  ml-md-0 mr-auto py-3"><a href="javascript:void(0);" class="site-menu-toggle js-menu-toggle"><span class="icon-menu h3"></span></a></div>
                                        <ul class="site-menu js-clone-nav d-none d-lg-block">
                                            <li >
                                                <router-link :to="'/'" >{{$t('NavBar["Inicio"]')}}</router-link>
                                            </li>
                                            <li class="has-children">
                                                <a href="javascript:void(0);" >{{$t('NavBar["Hoteles"]')}}</a>                                                                                                
                                                <ul class="dropdown arrow-top ">
                                                    <li v-for="hotelData in hotels" :key="hotelData.key">
                                                        <router-link exact :to="{ name: 'hotel', params: { key: hotelData.key } }">
                                                            {{hotelData.name}}
                                                        </router-link>
                                                    </li>                                                        
                                                </ul>
                                            </li>   

                                            <li v-if="this.$route.params.key || this.$route.params.hotel">
                                                
                                                <router-link :to="{ name: 'galeria',  params: { key: this.$route.params.key || this.$route.params.hotel }, hash:'#galeria', }">
                                                    {{$t('NavBar["Galeria"]')}}
                                                </router-link>
                                            </li>                                            

                                            <li class="has-children">
                                                <a href="javascript:void(0);" >{{$t('NavBar["Contactanos"]')}}</a>
                                                <ul class="dropdown arrow-top ">
                                                    <li v-for="hotelData in hotels" :key="hotelData.key">
                                                        <router-link exact :to="{ name: 'Contactanos', params: { key: hotelData.key }, hash: '#contactoScroll' }">
                                                            {{hotelData.name}}
                                                        </router-link>
                                                    </li>        
                                                </ul>
                                            </li> 
                                            <li class="has-children">
                                                <a href="javascript:void(0);" >{{$t('NavBar["Reserva"]')}}</a>                                           
                                                <ul class="dropdown arrow-top ">
                                                    <li v-for="hotelData in hotels" :key="hotelData.key">
                                                        <router-link :to="{ name: 'Seleccion-hotel', params: { key: hotelData.key }, hash:'#habitaciones', }">
                                                            {{hotelData.name}}
                                                        </router-link>
                                                    </li>                                                        
                                                </ul>
                                            </li>  
                                            <li >
                                                <router-link :to="{ path: '/Web-checkin', hash: '#checkin' }">
                                                    {{$t('NavBar["WebCheckin"]')}}
                                                </router-link>
                                            </li>
                                            <li style="width: 7% !important; cursor:pointer;">
                                                <img @click="SetLang('en')" src="~@/assets//eeuu.png" alt="Inglés/English" style="width: 100% !important;">
                                            </li>
                                            <li style="width: 7% !important;cursor:pointer;">
                                                <img @click="SetLang('es')" src="~@/assets//spain.png" alt="Español/Spanish" style="width: 100% !important;">
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
        isDefaultImage: true,
        isHidden: null,
        isHiddenR: null,
        isHiddenRes: null,
        files: [],
        hotels: [],
        hotelsOnChildAdded: null,
        hotelsOnChildRemoved: null,        
        hotelsRef: db.child("tambohotels")
      }
    },
    methods:{   
        SetLang(id){  
            
            localStorage.setItem("Lang",id)
            this.$i18n.locale = id;           
        },     
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
        },
        showHotelsRes() {
            if(this.isHiddenRes)
                this.isHiddenRes = false
            else
                this.isHiddenRes = true
        },
        handleScroll(event) {
            // Any code to be executed when the window is scrolled 
            //console.log(window.scrollY);
            if (window.scrollY > 1) {
                return (this.isDefaultImage = false);
            }
            if (window.scrollY <= 100) {
                if (!this.defaultImage) {
                return (this.isDefaultImage = true);
                }
            }
        },
    },  
    created() {
        window.addEventListener("scroll", this.handleScroll);
        this.getHotels()
        this.isHidden = false
        //console.log('isHidden es: '+this.$route.params.key)
    },
    beforeDestroy() {
        this.hotelsRef.off("child_added", this.hotelsOnChildAdded)
        this.hotelsRef.off("child_removed", this.hotelsOnChildRemoved)
    },
    destroyed() {
        window.removeEventListener("scroll", this.handleScroll);
    }
}

</script>

<style scoped>
    .iconoInicio{
        width:100% 
    }
     @media only screen and (max-width: 900px) {
         .iconoInicio{
             width: 200%;
         }
     }
</style>
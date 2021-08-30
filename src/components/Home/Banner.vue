<template>
    <span >
        <Carousel class="Carousel" :autoplay="true"
                      :per-page="1"
                      :loop="true"
                      :autoplayTimeout="3000"
                      :paginationEnabled="false"
                      :speed="1000">
            <Slide class="media-with-text flex-item">                
                <div class="site-blocks-cover overlay darker" :style="{backgroundImage: 'url(' + require('@/assets/hero_1.jpg')+')'}" >
                    <div class="container">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-md-7 text-center" data-aos="fade">
                                <h1 class="mb-2 brigther bannerFont">{{$t('Banner["Img1"]["linea1"]')}} </h1>
                                <h1 class="mb-2 brigther bannerFont">{{$t('Banner["Img1"]["linea2"]')}}</h1>
                                <!-- <h2 class="caption brigther bannerBodyFont">Disfrute del Perú</h2> -->
                            </div>
                        </div>
                    </div>
                </div>              
            </Slide> 
            <Slide class="media-with-text flex-item">                
                <div class="site-blocks-cover overlay darker" :style="{ backgroundImage: 'url(' + require('@/assets/hero_2.jpg')+')' }" >
                    <div class="container">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-md-7 text-center" data-aos="fade">
                                <h1 class="mb-2 brigther bannerFont">{{$t('Banner["Img2"]["linea1"]')}} </h1>
                                <h1 class="mb-2 brigther bannerFont">{{$t('Banner["Img2"]["linea2"]')}}</h1>
                                <!-- <h2 class="caption brigther bannerBodyFont">Permítanos ser anfitriones de su estancia</h2> -->
                            </div>
                        </div>
                    </div>
                </div>              
            </Slide>   
            <Slide class="media-with-text flex-item">                
                <div class="site-blocks-cover overlay darker" :style="{ backgroundImage: 'url(' + require('@/assets/hero_3.jpg')+')' }" >
                    <div class="container">
                        <div class="row align-items-center justify-content-center">
                            <div class="col-md-7 text-center" data-aos="fade">
                                <h1 class="mb-2 brigther bannerFont">{{$t('Banner["Img3"]["linea1"]')}}</h1>
                                <h1 class="mb-2 brigther bannerFont">{{$t('Banner["Img3"]["linea2"]')}}</h1>
                            </div>
                        </div>
                    </div>
                </div>              
            </Slide>                        
        </Carousel>
        <div class="five-reasons">
            <div class="wow fadeInUp animated" data-wow-delay="1s" data-wow-duration="1.5s" style="visibility: visible; animation-duration: 1.5s; animation-delay: 1s; animation-name: fadeInUp;">
                <h5 id="titleBanner" class="text-white title">{{$t('Banner["IconosBanner"]["mensajeGral"]')}}</h5>
                <div class="five-items">
                    <ul class="text-white">
                        <li>
                            <font-awesome-icon icon="money-bill" class="text-white iconosBanner"/>
                            <span class="text-five" v-html="$t('Banner.IconosBanner.Icono1')"></span>
                        </li>                        
                        <li>
                            <font-awesome-icon icon="wifi" class="text-white iconosBanner"/>
                            <span class="text-five">{{$t('Banner["IconosBanner"]["Icono2"]')}}</span>
                        </li>
                        <li>
                            <router-link style="color:white" :to="{ path: '/Web-checkin', hash: '#checkin'}">
                                <font-awesome-icon icon="laptop" class="text-white iconosBanner"/>
                                <span >{{$t('Banner["IconosBanner"]["Icono3"]')}}</span>
                            </router-link>                        
                        </li>
                        <li>
                            <font-awesome-icon icon="virus-slash" class="text-white iconosBanner"/>
                            <span >{{$t('Banner["IconosBanner"]["Icono4"]')}}</span>
                        </li>
                        <li>
                            <font-awesome-icon icon="map-marker-alt" class="text-white iconosBanner"/>
                            <span class="text-five">{{$t('Banner["IconosBanner"]["Icono5"]')}}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <modal :scrollable="true" :adaptive="true" :width="600" :height="400" name="hotelesModal">
            <div style="margin-top:50px; margin-right:10px;margin-left:10px;" class="row">
                <div v-for="hotelData in hotels" :key="hotelData.key" class="col-sm-4 d-none d-lg-block">
                    
                    <router-link :to="{ name: 'Seleccion-hotel', params: { key: hotelData.key }, hash:'#habitaciones' }">
                        <div class="hotel-room text-center">
                            <img style="height:100px; width:150px" :src="hotelData.image || '../../public/assets/images/img_1.jpg'" alt="Image" class="img-fluid">
                            <div class="hotel-room-body">
                                <h3 class="heading mb-0">{{hotelData.name}}</h3>
                            </div>
                        </div>
                    </router-link>               
                </div> 
                <div v-for="hotelData in hotels" :key="hotelData.key" class="col-xs-4 d-block d-sm-block d-md-block d-lg-none d-xl-none">
                    <router-link :to="{ name: 'Seleccion-hotel', params: { key: hotelData.key }, hash:'#habitaciones' }">
                        <div class="hotel-room text-center">
                            <img style="height:50px; width:100px" :src="hotelData.image || '../../public/assets/images/img_1.jpg'" alt="Image" class="img-fluid">
                            <div class="hotel-room-body">
                                <span class="" style="font-zise:8px; color:black">{{hotelData.name}}</span>
                            </div>
                        </div>
                    </router-link>               
                </div> 
            </div>
        </modal>
    </span>
</template>

<script>
import { db } from '@/firebase.js'

import { Carousel, Slide } from 'vue-carousel';
import VModal from 'vue-js-modal'
export default {
    name: "Banner",
    data () {
      return {
        height : null,
        /*data para los hoteles */
        hotels : [],
        hotelsOnChildAdded: null,
        hotelsOnChildRemoved: null,
        hotelsRef: db.child("tambohotels")  
      }
    },
     props: {
        routeName: {
            required: false
        }            
    },
    components: {
        Carousel,
        Slide
    },
    methods: {
        show () {
            this.$modal.show('hotelesModal');
        },
        hide () {
            this.$modal.hide('hotelesModal');
        },    
        /*funciones de los hoteles */
        getHotels() {
           this.hotelsOnChildAdded = this.hotelsRef.on("child_added", snapshot => {
               const data = snapshot.val()
               const key = snapshot.key
               data.key = key
               this.hotels.push(data)
               //console.log(this.hotels)
           })

           this.hotelsOnChildRemoved = this.hotelsRef.on("child_removed", snapshot => {
               const index = this.hotels.findIndex(e => e.key == snapshot.key)
               this.hotels.splice(index, 1)
           })
        } 
    },
    async created () {
        await this.getHotels()
    },     
    beforeDestroy() {
        this.hotelsRef.off("child_added", this.hotelsOnChildAdded)
        this.hotelsRef.off("child_removed", this.hotelsOnChildRemoved)
    },
    watch : {
        $route (to, from){
            this.hide (),
            this.hotels = [],
            this.hotelsOnChildAdded = null,
            this.hotelsOnChildRemoved = null,
            this.getHotels()                       
        }
    }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pompiere&display=swap');
    .bannerFont{
        font-family: 'Abril Fatface', sans-serif;        
        font-weight: bolder;
        font-size: 55px !important;
        line-height: 1;
    }
    .bannerBodyFont{
        font-family: 'Pompiere', cursive;
        font-size: 30px !important;
        line-height: 1;
    }
    .iconosBanner{
        font-size: 36px !important;
    }
    .Carousel{
        height: 100vh !important;
        position: relative !important;
        margin: 0 !important;
    }    
    .display-dark{
        background:#000;
        position:absolute;
        opacity:0.4;
        width:100%;
        height: 100vh;
        top:0;
        z-index:1;
    }
    .darker:before{       
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background: rgba(0,0,0,0.7);
    }
    .brigther{
        color: #FFF;
    }
</style>
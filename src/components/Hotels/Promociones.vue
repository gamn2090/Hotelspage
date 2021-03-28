<template>
    <div class="site-section block-15">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>Nuestras promociones exclusivas web</h2>
                </div>
            </div>
            <Carousel v-if="this.todasPromos != null" :autoplay="true"                    
                      :per-page="1"
                      :loop="true"
                      :autoplayTimeout="3000"  >
                <Slide v-for="promosData in todasPromos" :key="promosData.key" class="promocionesTambo"> 
                    <!-- <router-link :to="{ name: 'hotel', params: { key: promosData.hotel} }" > -->
                    <div class="img-border-sm mb-12">                        
                        <div href="#!" class="image-play">
                            <img :src="promosData.image || '../../../public/assets/images/img_1.jpg'" :alt="promosData.name" class="img-fluid">
                        </div>                        
                    </div>
                <!-- </router-link> -->
                    <div class="innerContainer">
                        <div class="row align-items-center justify-content-center vertical-align">
                            <div class="col-md-12 text-center onTop" data-aos="fade">
                            <h2 class="heading mb-0 tituloPromocion">{{promosData.name}}</h2>
                            <h3 class="mb-3 d-block post-date infoPromocion">{{promosData.description}}</h3>
                                <p v-if="promosData.descuento && promosData.descuento !== 0" class="mb-3 d-block post-date">
                                    <center><strong>Desde USD {{ promosData.precioDol - (promosData.precioDol * (promosData.descuento / 100)) }} ó S/. {{ promosData.precioPen - (promosData.precioPen * (promosData.descuento / 100)) }}</strong></center> 
                                </p>
                                <p v-else class="mb-3 d-block post-date">
                                    <center><strong>Desde USD {{ promosData.precioDol }} ó S/. {{ promosData.precioPen - (promosData.precioPen * (promosData.descuento / 100)) }}</strong></center> 
                                </p>

                                <center>
                                    <span v-if="promosData.fechaFin" class="mb-3 d-block post-date">Desde {{promosData.fechaInicio}} Hasta {{promosData.fechaFin}}</span>
                                    <span v-else class="mb-3 d-block post-date">Por siempre</span>
                                </center>                               
                            </div>                            
                        </div>
                    </div>                   
                </Slide>                       
            </Carousel>
            <!-- <Carousel :autoplay="true"
                      :per-page-custom=[[1080,1]]
                      :loop="true"
                      :autoplayTimeout="2000"  >
                <Slide v-for="promosData in todasPromos" :key="promosData.key" class="media-with-text p-md-5 flex-item">                     
                    <router-link :to="{ name: 'reservas', params: { hotel: hotel, promo: promosData.key } }" >
                        <div class="img-border-sm mb-12">                        
                            <div href="#!" class="image-play">
                                <img :src="promosData.image || '../../../public/assets/images/img_1.jpg'" :alt="promosData.name" class="img-fluid">
                            </div>                        
                        </div> 
                    </router-link>
                    <center><h2 class="heading mb-0">{{promosData.name}}</h2></center>
                        
                    <p v-if="promosData.descuento && promosData.descuento !== 0" class="mb-3 d-block post-date">
                        <center><strong>Desde USD {{ promosData.precioDol - (promosData.precioDol * (promosData.descuento / 100)) }}</strong></center> 
                    </p>
                    <p v-else class="mb-3 d-block post-date">
                        <center><strong>Desde USD {{ promosData.precioDol }}</strong></center> 
                    </p>

                    <center><span v-if="promosData.fechaFin" class="mb-3 d-block post-date">Desde {{promosData.fechaInicio}} Hasta {{promosData.fechaFin}}</span>
                    <span v-else class="mb-3 d-block post-date">Por siempre</span></center>
                    <center><p>{{promosData.description}}</p></center>
                </Slide>                       
            </Carousel>             -->
        </div>
        
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    props: {
        todasPromos: {
            required: true
        },
        hotel: {
            required: true
        }
    },
    components: {
        Carousel,
        Slide
    },
    name: "Promociones",
    data () {
      return {
        
      }        
    }
}
</script>

<style scoped>
    .container{
        width:100% !important;
        margin:0 !important;
        padding:0 !important;
    }
    .img-fluid{
        height: 80vh;
        width: 100%;
    }
    .promocionesTambo{
        width: 100% !important;
        /*height: 60vh;*/
        text-align:left;
        position:relative;
    }   
    .vertical-align {
        display: table-cell;
        vertical-align: middle;
    }
    .onTop {
        position: relative;
        z-index: 99;
    }
    .innerContainer {
        border-radius: 7%;
        background-color: #fff;
        padding-right:20px;
        padding-bottom:20px;
        padding-top:20px;
        padding-left:10px;
        width: 30%;
        margin: 0;
        position: absolute;
        top: 50%;
        left: 20%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 99;
    }
    .Carousel {
        height: 60vh !important;
        position: relative !important;
        margin: 0 !important;
    }
    @media (min-width: 1200px){
    
        .container {
            max-width: 99%;
            margin:0 !important;
            padding:0 !important;
        }   
    }   @media (min-width: 768px){
        .container {
            max-width: 99%;
            margin:0 !important;
            padding:0 !important;
        }
    }
    @media (min-width: 576px){
        .container {
            max-width: 99%;
            margin:0 !important;
            padding:0 !important;
        }
    }
    @media only screen and (max-width: 500px) {
        .copyright{  
            background-color: rgba(88, 172, 225, 1)
        }
    }
    @media only screen and (max-width: 800px) {
        .innerContainer {
            border-radius: 7%;
            background-color: #fff;
            padding-right:20px;
            padding-bottom:20px;
            padding-top:20px;
            padding-left:10px;
            width: 50%;
            margin: 0;
            position: absolute;
            top: 50%;
            left: 20%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            z-index: 99;
        }
        .tituloPromocion, .infoPromocion{
            font-size: 20px !important;
        }
    }
</style>
<template>
    <div class="site-section block-15">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>{{$t('HotelesPage["Sections"]["Promociones"]["Titulo"]')}}</h2>
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
                        <div class="row align-items-center justify-content-center ">
                            <div class="col-md-12 text-center onTop" data-aos="fade">
                            <h2 class="heading mb-0 tituloPromocion">{{promosData.name}}</h2><br><br>
                            <h5 class="mb-3 d-block post-date infoPromocion" v-html="promosData.description">{{promosData.description}}</h5>                               
                                    <p v-if="promosData.descuento && promosData.descuento > 0" class="mb-3 d-block post-date">
                                        <center>      
                                                                              
                                            <strong v-if="(promosData.precioPen && promosData.precioPen !== '0')" >
                                                 <div  class="price">
                                                     Desde S/ {{ promosData.precioPen - (promosData.precioPen * (promosData.descuento / 100)) }}
                                                 </div>
                                            </strong>
                                        </center> 
                                    </p>                               
                                    <p v-else class="mb-3 d-block post-date">
                                        <center>
                                            <strong>
                                                <div  class="price"> 
                                                    S/ {{ promosData.precioPen }}
                                                </div>
                                            </strong>
                                        </center> 
                                    </p>                               
                                                            
                            </div>                            
                        </div>
                    </div> 
                    <div class="innerContainerBottom"><!--vertical-align -->
                        <div
                            class="row align-items-center justify-content-center " 
                        >
                            <div class="col-md-12 text-center onTop">
                                <h5 class="mb-3 d-block post-date infoPromocion terminos" v-html="promosData.terminos">{{promosData.terminos}}</h5><br><br>
                            </div>
                        </div>
                    </div>                  
                </Slide>                       
            </Carousel>
            
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
    
    .price{
        background-color: rgb(167, 91, 31);
        padding-top: 20px;
        padding-bottom: 20px;
        color: white;
        font-size: 20px;
        font-weight: bolder;
        margin-left: 30%;
        margin-right: 30%;
        border-radius: 20px;
    }
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
        height: 100%;
        border-radius: 7%;
        background-color: rgba(252, 252, 252,.8);
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
    .terminos{
        font-size: 12px !important;
    }
    .innerContainerBottom {
        height: 15%;
        background-color: rgb(252, 252, 252);
        padding-right:20px;
        padding-bottom:20px;
        padding-top:20px;
        padding-left:10px;
        width: 100%;
        margin: 0;
        position: absolute;
        bottom: -10%;
        left: 50%;
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        z-index: 99;
    }
    .tituloPromocion{
        padding-top:10px;
        font-size: 19px;
        color: rgb(167,91,31) !important;
    }   
    .infoPromocion{
        font-size: 16px;
    } 
    .Carousel {
        height: 100vh !important;
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
        .infoPromocion{
            padding-top:10px;
            font-size: 14px ;
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
        .infoPromocion{
            padding-top:10px;
            font-size: 12px ;
        }
        .innerContainerBottom {
            height: 17%;            
        }
        .terminos{
            font-size: 8px !important;
            color: black;
        }
    }
    @media only screen and (max-width: 900px) {
        .innerContainer {
            border-radius: 7%;
            width: 50%;
            margin: 0;
            top: 50%;
            left: 30%;
            -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        } 
        .price{
            font-size:16px;
        }
        .innerContainer h5{
            font-size:11px;
        }   
        .tituloPromocion, .infoPromocion{
            padding-top:10px;
            font-size: 16px ;
        }
        .terminos{
            font-size: 10px !important;
        }
    }
</style>
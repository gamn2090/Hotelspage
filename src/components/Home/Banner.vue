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
                                <h1 class="mb-2 brigther">Bienvenidos a Hoteles El Tambo</h1>
                                <h2 class="caption brigther">Disfrute del Perú</h2>
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
                                <h1 class="mb-2 brigther">Experiencia Extraordinaria</h1>
                                <h2 class="caption brigther">Permítanos ser anfitriones de su estancia</h2>
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
                                <h1 class="mb-2 brigther">Habitaciones Relajantes</h1>
                                <h2 class="caption brigther">Su habitación, sus reglas</h2>
                            </div>
                        </div>
                    </div>
                </div>              
            </Slide>                        
        </Carousel>
        <div class="five-reasons">
            <div class="wow fadeInUp animated" data-wow-delay="1s" data-wow-duration="1.5s" style="visibility: visible; animation-duration: 1.5s; animation-delay: 1s; animation-name: fadeInUp;">
                <h5 id="titleBanner" class="text-white title">3 Razones para reservar directamente con nosotros</h5>
                <div class="five-items">
                    <ul class="text-white">
                        <li>
                        <span class="icon-calendar text-white"></span>
                        <span class="text-five">Mejor Precio<br> Garantizado</span>
                        </li>
                        <li>
                        <span class="icon-check text-white"></span>
                        <span ><router-link :to="{ path: '/Reserva-online', hash: '#checkin' }"><button id="reserve-ahora" class="btn btn-primary pill text-button-five" >Reserva ahora</button></router-link><br>En línea</span>
                        </li>
                        <li>
                        <span class="icon-cutlery text-white"></span>
                        <span class="text-five">Ubicados en la<br> Mejor Zona de Lima, Miraflores</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </span>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel';

export default {
    name: "Banner",
    data () {
      return {
        
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
    }
};
</script>

<style>
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
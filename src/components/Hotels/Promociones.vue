<template>
    <div class="site-section block-15">
        <div class="container">
            <div class="row">
                <div class="col-md-6 mx-auto text-center mb-5 section-heading">
                    <h2>Nuestras promociones exclusivas web</h2>
                </div>
            </div>
            <Carousel :autoplay="true"
                      :per-page="3"
                      :loop="true"
                      :autoplayTimeout="2000"  >
                <Slide v-for="promosData in todasPromos" :key="promosData.key" class="media-with-text p-md-5 flex-item">                     <router-link :to="{ name: 'reservas', params: { hotel: hotel, promo: promosData.key } }" >
                        <div class="img-border-sm mb-4">                        
                            <div href="#!" class="image-play">
                                <img :src="promosData.image || '../../../public/assets/images/img_1.jpg'" :alt="promosData.name" class="img-fluid">
                            </div>                        
                        </div> 
                    </router-link>
                    <h2 class="heading mb-0">{{promosData.name}}</h2>
                        
                    <p v-if="promosData.descuento && promosData.descuento !== 0" class="mb-3 d-block post-date">
                        Desde USD {{ promosData.precioDol - (promosData.precioDol * (promosData.descuento / 100)) }} 
                    </p>
                    <p v-else class="mb-3 d-block post-date">
                        Desde USD {{ promosData.precioDol }} 
                    </p>

                    <span v-if="promosData.fechaFin" class="mb-3 d-block post-date">Desde {{promosData.fechaInicio}} Hasta {{promosData.fechaFin}}</span>
                    <span v-else class="mb-3 d-block post-date">Por siempre</span>
                    <p>{{promosData.description}}</p>
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
    .img-fluid{
        max-width: 250px !important;
        max-height: 250px !important;
        min-height: 150px !important;
    }
    .flex-item{
        text-align: center;
    }
    @media only screen and (max-width: 600px) {
        .img-fluid{
            max-width: 150px !important;
            max-height: 150px !important;
            min-height: 100px !important;
        }
    }
</style>